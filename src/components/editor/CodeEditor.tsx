import { useEffect, useState } from "react";

type Props = {
    content: string[] | undefined;
    isFile: boolean | undefined
}

export default function CodeEditor({ content, isFile }: Props) {
    return (
        <div className="min-h-[200vh] min-w-fit text-sm w-screen ml-[20%] bg-[#14213d] pt-[10vh] pl-6">
            {content && isFile ?
                <div className="flex space-x-2">
                    {content ? <div className="block text-gray-100">
                        {content.map((line, key) => <p>{key + 1}</p>)}
                    </div> : <></>}
                    <div
                        autoCorrect='false'
                        spellCheck='false'
                        aria-selected='false'
                        contentEditable
                        className="min-w-full w-screen select-text text-gray-100 focus:outline-none"
                    >
                        {content.map((line, key) => <p>{line}</p>)}
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}