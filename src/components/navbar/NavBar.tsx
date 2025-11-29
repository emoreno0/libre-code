import { useEffect, useState } from "react"
import { OpenResult } from "../../state/OpenedState"
import OpenButton from "./OpenButton"

export default function NavBar() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)

    const openFile = () => window.electronAPI.openFile()
    const openFolder = () => window.electronAPI.openFolder()
    const clearState = () => window.electronAPI.clearState()
    const saveFile = () => window.electronAPI.saveFile()
    const openConfig = () => window.electronAPI.openConfig()

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    return (
        <div className="fixed w-screen h-[6.5vh] border border-black z-10 select-none">
            <div className="flex justify-between h-full items-center">
                <div>
                    <OpenButton
                        onClick={openFile}
                        text='Open File'
                    />
                    <OpenButton
                        onClick={openFolder}
                        text='Open Folder'
                    />
                    {
                        currentState?.type == 'file' ?
                            <OpenButton
                                onClick={saveFile}
                                text='Save'
                            />
                            :
                            <></>
                    }
                    {
                        currentState?.path  ?
                            <OpenButton
                                onClick={clearState}
                                text='Remove'
                            />
                            :
                            <></>
                    }
                </div>
                <div className="pr-2">
                    <OpenButton
                        onClick={openConfig}
                        text="Config"
                    />
                </div>
            </div>
        </div>
    )
}

