"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => electron.ipcRenderer.invoke("open-file"),
  openFolder: () => electron.ipcRenderer.invoke("open-folder"),
  openConfig: () => electron.ipcRenderer.send("open-config")
});
