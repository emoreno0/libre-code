import { useEffect, useRef, useState } from "react";
import { OpenResult } from "../../state/state";

export default function CodeEditor() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [lineNum, setLineNum] = useState<number>(1)
    const editorRef = useRef<HTMLDivElement>(null);

    const content = currentState?.content?.split('\n')
    const isFile = currentState?.type === 'file'


    useEffect(() => {
        const editor = editorRef.current

        editor?.addEventListener('input', () => {countLines()})

        countLines()

        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    const countLines = () => {
        const count = editorRef.current?.children.length
        if (!count) return
        setLineNum(Math.max(count | 0, 1))
    }

    return (
        <div className="min-h-[200vh] text-sm ml-[20%] bg-[#14213d] pt-[8vh] pl-2">
            {content && isFile ?
                <div className="flex space-x-2">
                    {content ? <div className="block text-gray-400 select-none">
                        {Array.from({ length: lineNum }, (_, i) => (
                            <p key={i}>{i + 1}</p>
                        ))}
                    </div>
                        :
                        <></>
                    }
                    <div
                        ref={editorRef}
                        autoCorrect='false'
                        spellCheck='false'
                        aria-selected='false'
                        contentEditable
                        suppressContentEditableWarning
                        className="min-w-fit w-screen select-text text-gray-100 focus:outline-none"
                    >

                        {content ?
                            <>
                                {content.map((line, key) =>
                                    <p key={key}>
                                        {line}
                                        <br />
                                    </p>
                                )}
                            </>
                            :
                            <p>
                                
                            </p>
                        }
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}