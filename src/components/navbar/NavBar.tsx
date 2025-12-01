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
        <div
            className="fixed min-h-[6vh] max-h-[8vh] min-w-full bg-[#14213d] border border-black z-3 overflow-y-hidden"
            style={{ resize: "vertical" }}
        >
            <div className="flex h-full justify-between">
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
                        currentState?.path ?
                            <OpenButton
                                onClick={clearState}
                                text='Remove'
                            />
                            :
                            <></>
                    }
                </div>
                <div>
                    <OpenButton
                        onClick={openConfig}
                        text="Config"
                    />
                </div>
            </div>
        </div>
    )
}

