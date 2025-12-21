import { ipcRenderer, contextBridge } from 'electron'
import { StateType } from '../src/state/State'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  openConfig: () => ipcRenderer.send('open-config'),
  onStateChanged: (callback: (state: StateType | null) => void) => 
    ipcRenderer.on('app-state-changed', (_e, state) => callback(state))
})