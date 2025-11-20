import { app, BrowserWindow, Menu, dialog } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
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
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "New",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            console.log("New file clicked");
          }
        },
        {
          label: "Open file",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const filePath = await getPath("file");
            console.log(filePath);
          }
        },
        {
          label: "Open folder",
          accelerator: "CmdOrCtrl+1",
          click: async () => {
            const folderPath = await getPath("folder");
            console.log(folderPath);
          }
        },
        {
          label: "Save",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            console.log("Save clicked");
          }
        },
        { type: "separator" },
        {
          label: "Exit",
          click: () => {
            app.quit();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}
async function getPath(type) {
  let result;
  try {
    if (type === "file") {
      result = await dialog.showOpenDialog({
        properties: ["openFile"]
      });
    } else if (type === "folder") {
      result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
      });
    }
    return result && result.filePaths.length > 0 ? result.filePaths[0] : void 0;
  } catch (error) {
    console.error(`Error detected in ${type}`, error);
    return void 0;
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
