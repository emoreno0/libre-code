import 'electron'

declare global {
  interface Window {
    electronAPI: {
      openFile: () => Promise<void>
      openFolder: () => Promise<void>
      clearState: () => Promise<void>
      saveContent: () => Promise<void>
      openConfig: () => Promise<void>
      onStateChanged: (callback: (_e, state) => void) => void
    }
  }
}