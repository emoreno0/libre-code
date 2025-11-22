import { app, BrowserWindow, dialog, ipcMain, Menu, MenuItemConstructorOptions } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import { readdirSync } from 'node:fs'

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
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.webContents.openDevTools()

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
            const openFile = await openPath('file')
            console.log(openFile?.path)
            console.log(openFile?.content)
          },
        },
        {
          label: 'Open folder',
          accelerator: 'CmdOrCtrl+1',
          click: async () => {
            const openFolder = await openPath('folder')
            console.log(openFolder?.path)
            console.log(openFolder?.folderList)
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

// Declare open-path
ipcMain.handle('open-path', async (event, type: PathType): Promise<OpenResult | undefined> => {
  return openPath(type)
})

// Declare an interface for results
interface OpenResult {
  content: string | undefined,
  path: string | undefined,
  folderList: string[] | undefined,
}

// Declare the type of path
type PathType = 'file' | 'folder'

// Function for getting the path and reading
async function openPath(type: PathType): Promise<OpenResult | undefined> {
  try {
    let path, content, folderList
    path = await dialog.showOpenDialog({
      properties: type === 'file' ? ['openFile'] : ['openDirectory']
    })

    path = path.filePaths[0]

    if (type === 'file') {
      content = await fs.readFile(path, 'utf-8')
      return { content: content, path: path, folderList: undefined }
    } else if (type === 'folder') {
      folderList = await readdirSync(path)
      return { content: undefined, path: path, folderList: folderList }
    }

  } catch (error) {
    console.error(`Error detected in ${type}`, error)
    return { path: undefined, content: undefined, folderList: undefined }
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