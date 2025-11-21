import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            console.log('New file clicked')
          },
        },
        {
          label: 'Open file',
          accelerator: 'CmdOrCtrl+0',
          click: async () => {
            const filePath = await getPath('file')
            const fileContent = await readFile(filePath!)
            console.log(filePath)
            console.log(fileContent)
          },
        },
        {
          label: 'Open folder',
          accelerator: 'CmdOrCtrl+1',
          click: async () => {
            const folderPath = await getPath('folder')
            console.log(folderPath)
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            console.log('Save clicked')
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          click: () => {
            app.quit()
          },
        },
      ],
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)

  Menu.setApplicationMenu(menu)
}

// Declare the type of path
type PathType = 'file' | 'folder'

// Get path depending on path type
async function getPath(type: PathType): Promise<string | undefined> {
  let result
  try {
    if (type === 'file') {
      result = await dialog.showOpenDialog({
        properties: ['openFile']
      })
    } else if (type === 'folder') {
      result = await dialog.showOpenDialog({
        properties: ['openDirectory']
      })
    }
    return result && result.filePaths.length > 0 ? result.filePaths[0] : undefined
  } catch (error) {
    console.error(`Error detected in ${type}`, error)
    return undefined
  }
}

// Reads file
async function readFile(filePath: string): Promise<string | undefined> {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    console.log(error)
    return undefined
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})