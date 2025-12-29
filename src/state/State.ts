import { BrowserWindow } from "electron"

export type StateType = {
    type: 'file' | 'folder'
    name: string
    path: string
    content?: string
    dirElements?: dirElement[]
}

export type dirElement = {
    type: 'file' | 'folder'
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
    getDirElements = (): dirElement[] | undefined => this.state?.dirElements

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