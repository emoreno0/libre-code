import { useEffect, useState } from "react";
import { OpenResult } from "../state/OpenedState";

export default function FileExplorer() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)

    const foldersList = currentState?.foldersList
    const filesList = currentState?.filesList
    const isFile = currentState?.type === 'file'
    const name = currentState?.name


    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    return (
        <div className="fixed space-y-2 p-2 text-sm text-gray-100 w-[40%] mt-[6.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {foldersList ?
                <div className="w-full text-md overflow-x-hidden hover:bg-[#203561] rounded-md">
                    <p className="p-1">
                        {name}
                    </p>
                </div>
                :
                <></>
            }
            {
                foldersList ? (
                    <>
                        {
                            foldersList.map((fold, key) =>
                                <div key={key} className="pl-2 w-full text-md overflow-x-hidden">
                                    <p className="p-0.5 hover:bg-[#203561] rounded-md">
                                        {fold[1]}
                                    </p>
                                    {
                                        filesList?.map((file, key) =>
                                            <div key={key} className="w-full pl-2 text-md overflow-x-hidden">
                                                {fold[1] == file[0] ?
                                                    <p className="p-0.5 hover:bg-[#203561] rounded-md">
                                                        {file[1]}
                                                    </p>
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </>
                ) : isFile ? (
                    <div className="pl-2 text-gray-100 w-full text-md hover:bg-[#203561] overflow-x-hidden">
                        {name}
                    </div>
                )
                    :
                    <></>
            }
        </div>
    )
}