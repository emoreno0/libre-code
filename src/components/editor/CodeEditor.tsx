import { useEffect, useState } from "react"
import { OpenResult } from "../../state/OpenedState"

export default function CodeEditor() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [value, setValue] = useState("")

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
            setValue(state?.content ?? "")
        })
        window.electronAPI.editContent(value)
    }, [value])

    const lineCount = value.split("\n").length

    return (
        <div className="min-h-[200vh] bg-[#1a2949] text-sm text-gray-100 ml-[225px] pt-2 pl-2 overflow-x-scroll">
            {
                currentState?.type == 'file' ?
                    <div className="flex">
                        <div className="block select-none">
                            {Array.from({ length: lineCount }).map((_, i) => (
                                <div key={i}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        <textarea
                            className="min-w-fit w-screen select-text focus:outline-none pl-2 resize-none"
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