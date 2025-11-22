import { app, BrowserWindow, dialog, ipcMain, Menu, MenuItemConstructorOptions } from 'electron'
import path from 'node:path'
import fs from 'node:fs/promises'
import { readdirSync } from 'node:fs'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (import.meta.env.DEV) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

const menuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
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
        click: () => {
          console.log("Save!")
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

// Declare open-path
ipcMain.handle('open-path', async (event, type: PathType): Promise<OpenResult | undefined> => {
  return openPath(type)
})

// Declare an interface for results
interface OpenResult {
  content: string | undefined,
  path: string | undefined,
  folderList: string[][] | undefined,
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