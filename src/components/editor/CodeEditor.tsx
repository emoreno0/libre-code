import { useEffect, useState } from "react"
import { OpenResult } from "../../state/OpenedState"

export default function CodeEditor() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [value, setValue] = useState("")

    useEffect(() => {
        const unsubscribe = window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
            if (state?.type === "file") {
                setValue(state.content ?? "")
            }
        })
        return () => unsubscribe
    }, [])

    useEffect(() => {
        if (!currentState || currentState.type !== "file") return

        const timeoutId = setTimeout(() => {
            window.electronAPI.editContent(value)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [value, currentState])

    const lineCount = value.split("\n").length

    return (
        <div className="min-h-screen bg-[#1a2949] text-md text-gray-100 ml-[225px] overflow-hidden">
            {
                currentState?.type == 'file' ?
                    <div className="flex w-full h-screen">
                        <div className="block select-non px-1">
                            {Array.from({ length: lineCount }).map((_, i) => (
                                <div key={i}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        <div className="w-full px-1">
                            <textarea
                                className="min-w-full min-h-screen h-fit w-fit select-text focus:outline-none resize-none whitespace-nowrap"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}