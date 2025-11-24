import { useEffect, useRef, useState } from "react";

type Props = {
    content: string[] | undefined;
    isFile: boolean | undefined
}

export default function CodeEditor({ content, isFile }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [lineNum, setLineNum] = useState<number>(1)

    useEffect(() => {
        const editor = editorRef.current
        if (content) { countLines() }
        if (!editor) return
        editor.addEventListener('input', () => countLines())
    })

    const countLines = () => {
        const count = editorRef.current?.children.length
        if (count == undefined) return
        setLineNum(Math.max(count | 0, 1))
    }

    return (
        <div className="min-h-[200vh] text-sm ml-[20%] bg-[#14213d] pt-[8vh] pl-4">
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

                        {content.map((line, key) =>
                            <p key={key}>
                                {line}
                                <br />
                            </p>
                        )}
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}