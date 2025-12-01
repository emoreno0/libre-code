import { useEffect, useState } from 'react'
import { OpenResult } from '../../state/OpenedState'
import OpenButton from './OpenButton'

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
            className='fixed min-w-[50px] max-w-[50px] min-h-screen bg-[#14213d] border-r border-black z-3 overflow-x-hidden'
            style={{ resize: 'horizontal' }}
        >
            <div className='flex flex-col h-screen'>
                <OpenButton
                    onClick={openFile}
                    type='file'
                />
                <OpenButton
                    onClick={openFolder}
                    type='folder'
                />
                {
                    currentState?.type == 'file' ?
                        <OpenButton
                            onClick={saveFile}
                            type='save'
                        />
                        :
                        <></>
                }
                {
                    currentState?.path ?
                        <OpenButton
                            onClick={clearState}
                            type='remove'
                        />
                        :
                        <></>
                }
                <div className='mt-auto'>
                    <OpenButton
                    onClick={openConfig}
                    type='config'
                />
                </div>
            </div>
        </div>
    )
}

