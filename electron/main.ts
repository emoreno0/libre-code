import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { readdir, readdirSync } from 'node:fs'
import { appState } from '../src/state/OpenedState'
import path, { extname } from 'node:path'
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
    win.webContents.openDevTools()
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
      async function getFoldersAndFilesList(dirPath: string): Promise<{
        foldersRaw: string[],
        filesRaw: string[],
        folders: string[],
        files: string[],
      }> {
        const foldersRaw: string[] = []
        const filesRaw: string[] = []

        const list = await fs.readdir(dirPath, { withFileTypes: true })

        for (const item of list) {
          const fullPath = path.join(dirPath, item.name)

          if (item.isDirectory()) {
            foldersRaw.push(fullPath)

            const sub = await getFoldersAndFilesList(fullPath)

            foldersRaw.push(...sub.foldersRaw)
            filesRaw.push(...sub.filesRaw)

          } else if (item.isFile()) {
            filesRaw.push(fullPath)
          }
        }

        const folders = foldersRaw.map((item) => path.relative(dirPath, item))
        const files = filesRaw.map((item) => path.relative(dirPath, item))

        return {
          foldersRaw,
          filesRaw,
          folders,
          files,
        }
      }

      const { folders, files } = await getFoldersAndFilesList(openPath)

      appState.set({
        type: type,
        name: name!,
        path: openPath,
        foldersList: folders,
        filesList: files,
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