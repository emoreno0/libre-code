import { BrowserWindow } from 'electron'

export type OpenResult = {
  type: 'file' | 'folder'
  path: string
  name: string
  extension?: string
  content?: string
  foldersList?: string[]
  filesList?: string[]
  rawContentList?: string
}

class AppState {
  private state: OpenResult | null = null

  set(result: OpenResult | null) {
    this.state = result
    this.notifyRenderer()
  }

  get(): OpenResult | null {
    return this.state
  }

  getType = (): 'file' | 'folder' | null => this.state?.type ?? null
  getPath = (): string | undefined => this.state?.path
  getName = (): string | undefined => this.state?.name
  getContent = (): string | undefined => this.state?.content
  getFoldersList = (): string[] | undefined => this.state?.foldersList
  getFilesList = (): string[] | undefined => this.state?.filesList
  getRawContentList = (): string | undefined => this.state?.rawContentList
  getExtension = (): string | undefined => this.state?.extension

  isFile = (): boolean => this.state?.type === 'file'
  isFolder = (): boolean => this.state?.type === 'folder'

  clear = () => {
    this.state = null
    this.notifyRenderer()
  }

  private notifyRenderer() {
    const win = BrowserWindow.getAllWindows()[0]
    win?.webContents.send('app-state-changed', this.state)
  }
}

export const appState = new AppState()