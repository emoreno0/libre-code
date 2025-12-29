import { app, BrowserWindow, dialog, ipcMain, Menu, MenuItemConstructorOptions } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

import { appState, dirElement } from '../src/state/State'

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

  // App menu!
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+F',
          click: () => openDialog('file')
        },
        {
          label: 'Open Folder',
          accelerator: 'CmdOrCtrl+D',
          click: () => openDialog('folder')
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'windowMenu'
    },
    {
      label: 'Help'
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Handlers!
ipcMain.handle('open-file', () => openDialog('file'))
ipcMain.handle('open-folder', () => openDialog('folder'))
ipcMain.handle('clear-state', () => appState.clear())
ipcMain.handle('save-content', () => saveContent())

// Opens dialog!
async function openDialog(type: 'file' | 'folder') {
  try {
    const res = dialog.showOpenDialog(win!, {
      properties: type === 'file' ? ['openFile'] : ['openDirectory']
    })

    const openedPath = (await res).filePaths[0]
    const name = path.basename(openedPath)

    if (openedPath != appState.getPath()) {
      appState.clear()
    }

    if (type == 'file') {
      const content = await fs.readFile(openedPath, 'utf-8')

      appState.set({
        ...appState.get()!,
        type: type,
        path: openedPath,
        name: name,
        content: content
      })

    } else if (type == 'folder') {
      const dirElements = await getFilesAndFolders(openedPath)

      appState.set({
        ...appState.get()!,
        type: type,
        path: openedPath,
        name: name,
        dirElements: dirElements
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// Returns files & folders!
async function getFilesAndFolders(dirPath: string): Promise<dirElement[]> {
  const dirEl: dirElement[] = []

  const list = await fs.readdir(dirPath, { withFileTypes: true })

  for (const item of list) {
    const fullPath = path.join(dirPath, item.name)

    const element: dirElement = {
      type: item.isFile() ? 'file' : 'folder',
      path: fullPath,
      name: item.name,
      parent: item.parentPath,
      depth: fullPath.split(path.sep).length,
    }

    if (item.isDirectory()) {
      dirEl.push(element)

      if (!foldersToIgnore.has(item.name)) {
        const sub = await getFilesAndFolders(fullPath)

        dirEl.push(...sub)
      }
    } else if (item.isFile()) {
      dirEl.push(element)
    }
  }
  return dirEl
}

// Saves content!
async function saveContent() {
  console.log('Content saved!')
}

// Opens config window!
ipcMain.on('open-config', () => {
  const configWin = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  configWin.setMenu(null)

  if (VITE_DEV_SERVER_URL) {
    configWin.loadURL('http://localhost:5173/config.html')
  } else {
    configWin.loadFile(path.join(RENDERER_DIST, 'config.html'))
  }
})

// Folders to ignore!
export const foldersToIgnore = new Set([
  ".git",
  ".svn",
  ".hg",
  ".bzr",
  "node_modules",
  "vendor",
  "bower_components",
  "jspm_packages",
  "libs",
  "packages",
  "dist",
  "build",
  "out",
  "target",
  "bin",
  "obj",
  "Debug",
  "Release",
  ".next",
  ".nuxt",
  "www",
  "public/build",
  "coverage",
  ".cache",
  ".parcel-cache",
  ".npm",
  ".yarn/cache",
  ".eslintcache",
  "__pycache__",
  ".pytest_cache",
  ".ruff_cache",
  ".mypy_cache",
  ".swc",
  ".svelte-kit",
  ".idea",
  ".vscode",
  ".vs",
  ".code-workspace",
  ".project",
  ".classpath",
  ".settings",
  ".factorypath",
  ".eclipse",
  ".sublime-project",
  ".sublime-workspace",
  ".DS_Store",
  "Thumbs.db",
  "ehthumbs.db",
  ".Trashes",
  ".Spotlight-V100",
  ".fseventsd",
  "logs",
  "log",
  "tmp",
  "temp",
  ".nyc_output",
  ".sass-cache",
  ".bundle",
  "venv",
  ".env",
  ".env.local",
  ".env.development",
  ".env.test",
  ".env.production",
  "dist-zip",
  "release"
])

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)