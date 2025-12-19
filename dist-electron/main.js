import { ipcMain, dialog, BrowserWindow, app, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          accelerator: "CmdOrCtrl+F",
          click: () => openDialog("file")
        },
        {
          label: "Open Folder",
          accelerator: "CmdOrCtrl+D",
          click: () => openDialog("folder")
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "windowMenu"
    },
    {
      label: "Help"
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.handle("open-file", () => openDialog("file"));
ipcMain.handle("open-folder", () => openDialog("folder"));
async function openDialog(type) {
  try {
    const res = dialog.showOpenDialog(win, {
      properties: type === "file" ? ["openFile"] : ["openDirectory"]
    });
    console.log((await res).filePaths);
  } catch (error) {
    console.log(error);
  }
}
ipcMain.on("open-config", () => {
  const configWin = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  configWin.setMenu(null);
  if (VITE_DEV_SERVER_URL) {
    configWin.loadURL("http://localhost:5173/config.html");
  } else {
    configWin.loadFile(path.join(RENDERER_DIST, "config.html"));
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
