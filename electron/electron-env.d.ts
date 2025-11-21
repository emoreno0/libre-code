import 'electron'

declare global {
  interface Window {
    electronAPI: {
      openPath: (type: 'file' | 'folder') => Promise<{
        path?: string
        content?: string
        folderList?: string[]
      }>
    }
  }
}

export {}