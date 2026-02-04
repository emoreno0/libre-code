import { BrowserWindow } from "electron"

export type StateType = {
    type: 'file' | 'folder'
    name: string
    path: string
    content?: string
    folderList?: DirElement[]
    fileList?: DirElement[]
}

export type DirElement = {
    path: string
    name: string
    parent: string
    depth: number
}

class AppState {
    private state: StateType | null = null

    get() {
        return this.state
    }

    set(result: StateType | null) {
        this.state = result
        this.notifyRenderer()
    }

    getType = (): 'file' | 'folder' | null => this.state?.type ?? null
    getName = (): String | undefined => this.state?.name
    getPath = (): String | undefined => this.state?.path
    getContent = (): String | undefined => this.state?.content
    getFolderList = (): DirElement[] | undefined => this.state?.folderList
    getFileList = (): DirElement[] | undefined => this.state?.fileList

    clear() {
        this.state = null
        this.notifyRenderer()
    }

    private notifyRenderer() {
        const win = BrowserWindow.getAllWindows()[0]
        win.webContents.send('app-state-changed', this.state)
    }
}

export const appState = new AppState