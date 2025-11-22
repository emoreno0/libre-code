import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'node:path'
import { readdirSync } from 'node:fs'
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

interface OpenResult {
  content?: string
  path?: string
  folderList?: string[]
}

type PathType = 'file' | 'folder'

ipcMain.handle('open-path', async (event, type: PathType): Promise<OpenResult | undefined> => {
  return openPath(type)
})

async function openPath(type: PathType): Promise<OpenResult | undefined> {
  try {
    const result = await dialog.showOpenDialog(win!, {
      properties: type === 'file' ? ['openFile'] : ['openDirectory'],
    })

    if (result.canceled || !result.filePaths[0]) return undefined

    const selectedPath = result.filePaths[0]

    if (type === 'file') {
      const content = await fs.readFile(selectedPath, 'utf-8')
      return { content, path: selectedPath }
    } else {
      const folderList = readdirSync(selectedPath)
      return { path: selectedPath, folderList }
    }
  } catch (error) {
    console.error(`Error al abrir ${type}:`, error)
    return undefined
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})