import { useCallback, useEffect, useState } from "react"
import { OpenResult } from "../../state/OpenedState"
import ExplorerButton from "./ExplorerButton"

export default function FileExplorer() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [showFolders, setShowFolders] = useState<boolean>(true)
    const [orderedItems, setOrderedItems] = useState<Item[]>([])

    const openName = currentState?.name

    interface Item {
        name: string
        type: 'file' | 'folder'
        parent: string
        depth: number
    }

    const rebuildItems = useCallback(() => {
        const items: Item[] = []
        currentState?.foldersList?.forEach((folder) => {
            const parts = folder.split('/')

            items.push({
                name: parts.length < 2 ? parts[0] : parts[parts.length - 1],
                type: 'folder',
                parent: parts.length < 2 ? openName! : parts[parts.length - 2],
                depth: parts.length
            })
        })

        currentState?.filesList?.forEach((file) => {
            const parts = file.split('/')

            items.push({
                name: parts.length < 2 ? parts[0] : parts[parts.length - 1],
                type: 'file',
                parent: parts.length < 2 ? openName! : parts[parts.length - 2],
                depth: parts.length
            })
        })
        setOrderedItems(items)
    }, [currentState, openName])

    useEffect(() => {
        window.electronAPI.onStateChanged((state) => {
            setCurrentState(state)
        })
        rebuildItems()
    }, [currentState])


    const handleShowFolders = () => {
        setShowFolders(!showFolders)
    }

    return (
        <div className="fixed bg-[#14213d] p-1 text-sm z-10 text-gray-100 w-[40%] mt-[6.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {
                openName ?
                    <div onClick={handleShowFolders}>
                        <ExplorerButton
                            name={openName}
                            type='projectName'
                            depth={0}
                        />
                    </div>
                    :
                    <></>
            }
            {
                showFolders ?
                    <>
                        {
                            orderedItems.map((folder) => (
                                <>
                                    {
                                        <>
                                            {
                                                folder.type == 'folder' ?
                                                    <div>
                                                        <ExplorerButton
                                                            name={folder.name}
                                                            type={'folder'}
                                                            depth={folder.depth}
                                                        />
                                                        {orderedItems.map((file) =>
                                                        (file.type == 'file' && folder.name == file.parent ?
                                                            <ExplorerButton
                                                                name={file.name}
                                                                type={'file'}
                                                                depth={file.depth}
                                                            />
                                                            :
                                                            <>
                                                            </>
                                                        )
                                                        )
                                                        }
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                        </>
                                    }
                                </>
                            ))
                        }
                    </>
                    :
                    <></>
            }
        </div>
    )
}