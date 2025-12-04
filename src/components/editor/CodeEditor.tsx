import { useEffect, useState } from 'react'
import { OpenResult } from '../../state/OpenedState'

export default function CodeEditor() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        const unsubscribe = window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
            if (state?.type === 'file') {
                setValue(state.content ?? '')
            }
        })
        return () => unsubscribe
    }, [])

    useEffect(() => {
        if (!currentState || currentState.type !== 'file') return

        const timeoutId = setTimeout(() => {
            window.electronAPI.editContent(value)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [value, currentState])

    const lineCount = value.split('\n').length

    return (
        <div className='min-h-screen min-w-full text-md text-gray-100 pl-[225px] overflow-hidden'>
            {
                currentState?.type == 'file' ?
                    <div className='flex bg-[#1a2949] min-w-full min-h-screen overflow-x-hidden overflow-y-auto'>
                        <div className='block px-2'>
                            {Array.from({ length: lineCount }).map((_, i) => (
                                <div key={i}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                            <textarea
                                className='min-h-full w-full overflow-x-auto overflow-y-hidden select-text focus:outline-none resize-none whitespace-nowrap'
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                    :
                    <></>
            }
        </div>
    )
}