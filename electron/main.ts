import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { readdirSync } from 'node:fs'
import { appState } from '../src/state/state'
import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 500,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.setMenu(null)

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// Handlers!
ipcMain.handle('open-file', () => openDialog('file'))
ipcMain.handle('open-folder', () => openDialog('folder'))
ipcMain.handle('edit-content', (_event, content: string) => editContent(content))
ipcMain.handle('save-file', () => saveFile())
ipcMain.handle('get-app-state', () => appState.get())
ipcMain.handle('clear-state', () => appState.clear())

// Opens Dialog & updates state!
async function openDialog(type: 'file' | 'folder') {
  try {
    const result = await dialog.showOpenDialog(win!, {
      properties: type === 'file' ? ['openFile'] : ['openDirectory'],
    })

    if (result.canceled || !result.filePaths[0]) return null

    const openPath = result.filePaths[0]
    const name = openPath.split('/').pop()

    if (type === 'file') {
      const content = await fs.readFile(openPath, 'utf-8')
      const extension = name?.split('.').pop()
      appState.set({
        type: type,
        name: name!,
        path: openPath,
        content: content,
        extension: extension
      })
    } else {

      // Returns an array of everything inside the directory path
      async function getFolderList(dirPath: string): Promise<string[]> {
        let res: string[] = []
        const list = readdirSync(dirPath, { withFileTypes: true })

        for (const item of list) {
          const fullPath = path.join(dirPath, item.name)
          if (item.isDirectory()) {
            const subContent = await getFolderList(fullPath)
            res = res.concat(subContent)
          } else {
            res.push(fullPath)
          }
        }
        return res
      }

      const contentList = await getFolderList(openPath)

      appState.set({
        type: type,
        name: name!,
        path: openPath,
        contentList: contentList
      })
    }
  } catch (error) {
    console.error(`Error al abrir ${type}:`, error)
  }
}

// Updates content state when content is edited
async function editContent(content: string) {
  try {
    appState.set({
      ...appState.get()!,
      content: content
    })
  } catch (error) {
    console.error(error)
  }
}

// Saves File!
async function saveFile() {
  const app = appState.get()
  if (!app || !app.path || !app.content) return
  await fs.writeFile(app?.path, app?.content, 'utf-8')
}

app.whenReady().then(createWindow)

// Opens Config Window
ipcMain.on("open-config", () => {
  const configWin = new BrowserWindow({
    width: 600,
    height: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })
  configWin.setMenu(null)

  if (import.meta.env.DEV) {
    configWin.loadURL('http://localhost:5173/config.html')
  } else {
    configWin.loadFile(path.join(__dirname, '../dist/config.html'))
  }

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})