import { useEffect, useState } from "react"
import OpenButton from "./buttons/OpenButton"
import { OpenResult } from "../state/state"

export default function NavBar() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)

    const openFile = () => window.electronAPI.openFile()
    const openFolder = () => window.electronAPI.openFolder()
    const clearState = () => window.electronAPI.clearState()
    const saveFile = () => window.electronAPI.saveFile()

    const isFile = currentState?.type === 'file'

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    return (
        <div className="fixed w-screen h-[6.5vh] bg-[#14213d] border border-black z-10 select-none">
            <div className="flex h-full items-center">
                <OpenButton onClick={openFile} text='Open File' />
                <OpenButton onClick={openFolder} text='Open Folder' />
                {
                    currentState ?
                        <OpenButton onClick={saveFile} text='Save' />
                        :
                        <></>
                }
                {
                    isFile ?
                        <OpenButton onClick={clearState} text='Remove' />
                        :
                        <></>
                }
            </div>
        </div>
    )
}

