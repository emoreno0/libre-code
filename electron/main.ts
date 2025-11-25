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
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// Handlers!
ipcMain.handle('open-file', () => openDialog('file'))
ipcMain.handle('open-folder', () => openDialog('folder'))
ipcMain.handle('edit-content', (_event, content:string) => editContent(content))
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

    const path = result.filePaths[0]
    const name = path.split('/').pop()

    if (type === 'file') {
      const content = await fs.readFile(path, 'utf-8')
      const extension = name?.split('.').pop()
      appState.set({
        type: type,
        name: name!,
        path: path,
        content: content,
        extension: extension
      })
    } else {
      const contentList = readdirSync(path)
      appState.set({
        type: type,
        name: name!,
        path: path,
        contentList: contentList
      })
    }
  } catch (error) {
    console.error(`Error al abrir ${type}:`, error)
  }
}

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
  console.log('File saved!')
}

// Do not touch!
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})