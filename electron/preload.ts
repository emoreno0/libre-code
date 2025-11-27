import { contextBridge, ipcRenderer } from 'electron'
import type { OpenResult } from '../src/state/OpenedState'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  editContent: (content:string) => ipcRenderer.invoke('edit-content', content),
  saveFile: () => ipcRenderer.invoke('save-file'),
  getAppState: (): Promise<OpenResult | null> => ipcRenderer.invoke('get-app-state'),
  clearState: () => ipcRenderer.invoke('clear-state'),
  openConfig: () => ipcRenderer.send("open-config"),
  onStateChanged: (callback: (state: OpenResult | null) => void) =>
    ipcRenderer.on('app-state-changed', (_e, state) => callback(state)),
})