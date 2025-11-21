import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openPath: (type: 'file' | 'folder') => ipcRenderer.invoke('open-path', type)
})