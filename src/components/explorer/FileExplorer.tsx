import { useEffect, useState } from "react";
import { OpenResult } from "../../state/OpenedState";
import ExplorerButton from "./ExplorerButton";

export default function FileExplorer() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [showFolders, setShowFolders] = useState<boolean>(true)

    const foldersList = currentState?.foldersList?.map((item) => item.split('/')).sort((a, b) => a.length - b.length)
    const filesList = currentState?.filesList?.map((item) => item.split('/')).sort((a, b) => a.length - b.length)
    const isFile = currentState?.type === 'file'
    const name = currentState?.name

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
    })

    const handleShowFolders = () => {
        setShowFolders(!showFolders)
    }

    return (
        <div className="fixed space-y- p-1 text-sm text-gray-100 w-[40%] mt-[6.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {foldersList ?
                <div
                    onClick={() => handleShowFolders()}
                    className="w-full text-md overflow-x-hidden hover:bg-[#203561] rounded-md">
                    <p className="p-0.5">
                        🛠️ {name}
                    </p>
                </div>
                :
                <></>
            }
            {
                foldersList && showFolders ? (
                    <>
                        {
                            foldersList.map((folder) =>
                                folder.length == 1 ?
                                    <>
                                        <ExplorerButton type='folder' name={folder[0]} />
                                        {
                                            filesList?.map((file) =>
                                                folder[0] == file[0] ?
                                                    <div className="ml-2">
                                                        < ExplorerButton type="file" name={file[1]} />
                                                    </div>
                                                    :
                                                    <></>
                                            )
                                        }
                                    </>
                                    : folder.length == 2 ?
                                        <>
                                            {
                                                filesList?.map((file) =>
                                                    folder[1] == file[0] ?
                                                        <div className="ml-2">
                                                            < ExplorerButton type="file" name={folder[1]} />
                                                        </div>
                                                        :
                                                        <></>
                                                )
                                            }
                                        </>
                                        :
                                        <></>
                            )
                        }
                        {
                            filesList?.map((file) =>
                                file.length == 1 ?
                                    <ExplorerButton type='file' name={file[0]} />
                                    :
                                    <></>
                            )
                        }
                    </>
                ) : isFile ? (
                    <div className="pl-1 text-gray-100 w-full text-md hover:bg-[#203561] overflow-x-hidden">
                        {name}
                    </div>
                )
                    :
                    <></>
            }
        </div>
    )
}