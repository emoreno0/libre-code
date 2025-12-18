import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  openConfig: () => ipcRenderer.send('open-config')
})