import type { OpenResult } from '../src/state/OpenedState'

declare global {
  interface Window {
    electronAPI: {
      openFile: () => Promise<void>
      openFolder: () => Promise<void>
      editContent: (content: string) => Promise<void>
      saveFile: () => Promise<void>
      getAppState: () => Promise<OpenResult | null>
      clearState: () => Promise<void>
      openConfig: () => Promise<void>
      checkProjectUpdates: () => Promise<void>
      onStateChanged: (callback: (state: OpenResult | null) => void) => void
    }
  }
}