import 'electron'

declare global {
  interface Window {
    electronAPI: {
      openFile: () => Promise<void>
      openFolder: () => Promise<void>
      openConfig: () => Promise<void>
      onStateChanged: (callback: (_e, state) => void) => void
    }
  }
}