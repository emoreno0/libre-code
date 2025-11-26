import { useEffect, useState } from "react";
import { OpenResult } from "../state/state";

export default function FileExplorer() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)

    const folderContent = currentState?.contentList
    const isFile = currentState?.type === 'file'
    const name = currentState?.name

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    return (
        <div className="fixed text-sm  w-[20%] mt-[6.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {!isFile && folderContent ? 
            <div className="pl-2 text-gray-100 w-full p-0.5 hover:bg-[#203561] overflow-x-hidden">
                {name}
            </div>
                :
                <></>
            }
            {
                folderContent && !isFile ? (
                    folderContent.map((cont, key) =>
                        <div key={key} className="pl-4 text-gray-100 w-full text-md p-0.5 hover:bg-[#203561] overflow-x-hidden">
                            {cont}
                        </div>
                    )
                ) : isFile ? (
                    <div className="pl-4 text-gray-100 w-full text-md p-0.5 hover:bg-[#203561] overflow-x-hidden">
                        {name}
                    </div>
                )
                    :
                    <></>
            }
        </div>
    )
}