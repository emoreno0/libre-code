import { contextBridge, ipcRenderer } from 'electron'
import type { OpenResult } from '../src/state/state'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  saveFile: () => ipcRenderer.invoke('save-file'),
  getAppState: (): Promise<OpenResult | null> => ipcRenderer.invoke('get-app-state'),
  clearState: () => ipcRenderer.invoke('clear-state'),
  onStateChanged: (callback: (state: OpenResult | null) => void) =>
    ipcRenderer.on('app-state-changed', (_e, state) => callback(state)),
})