import { useCallback, useEffect, useState } from 'react'
import { OpenResult } from '../../state/OpenedState'
import ExplorerButton from './ExplorerButton'

export default function FileExplorer() {
    const [currentState, setCurrentState] = useState<OpenResult | null>(null)
    const [showFolders, setShowFolders] = useState<boolean>(true)
    const [orderedItems, setOrderedItems] = useState<Item[]>([])
    const isWindows = navigator.platform === 'Win32' || navigator.platform === 'Win64'

    const openName = currentState?.name
    const type = currentState?.type

    interface Item {
        name: string
        type: 'file' | 'folder'
        parent: string
        depth: number
    }

    const rebuildItems = useCallback(() => {
        const items: Item[] = []
        currentState?.foldersList?.forEach((folder) => {
            let normalized = folder

            if (isWindows && /^[A-Za-z]:[\/\\]/.test(folder)) {
                normalized = folder.slice(3)
            }

            const parts = normalized.split(/[\\/]/).filter(Boolean)
            if (parts.length === 0) return

            items.push({
                name: parts.length < 2 ? parts[0] : parts[parts.length - 1],
                type: 'folder',
                parent: parts.length < 2 ? openName! : parts[parts.length - 2],
                depth: parts.length
            })
        })

        currentState?.filesList?.forEach((file) => {
            let normalized = file

            if (isWindows && /^[A-Za-z]:[\/\\]/.test(file)) {
                normalized = file.slice(3)
            }

            const parts = normalized.split(/[\\/]/).filter(Boolean)
            if (parts.length === 0) return

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

    useEffect(() => {
        if (currentState?.type == 'folder') {
            const checkUpdates = () => window.electronAPI.checkProjectUpdates()
            const interval = setInterval(checkUpdates, 5000)

            return () => clearInterval(interval)
        }
    }, [])

    const handleShowFolders = () => {
        if (type == 'file') {
            return
        } else {
        setShowFolders(!showFolders)
        }
    }

    return (
        <div
            className='fixed ml-[50px] min-w-[175px] max-w-[175px] bg-[#14213d] p-1 text-sm z-2 text-gray-100 h-screen border-r border-black select-none overflow-x-auto whitespace-nowrap'
            style={{ resize: 'horizontal' }}
        >
            <div className='flex w-full h-full'>
                <div className='w-full'>
                    {
                        openName ?
                            <div onClick={type == 'folder' ? () => handleShowFolders() : () => { }}>
                                <ExplorerButton
                                    isProjectFolder={type == 'folder' ? true : false}
                                    type={type!}
                                    name={openName}
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
                                    orderedItems.map((item) => (
                                        <>
                                            {
                                                <>
                                                    {
                                                        item.type == 'folder' ?
                                                            <div>
                                                                <ExplorerButton
                                                                    name={item.name}
                                                                    type={'folder'}
                                                                    depth={item.depth}
                                                                />
                                                                {orderedItems.map((file) =>
                                                                (file.type == 'file' && item.name == file.parent && item.depth == file.depth - 1 ?
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
                                                            <>
                                                                {
                                                                    item.type == 'file' && item.parent == openName ?
                                                                        <>
                                                                            <ExplorerButton
                                                                                name={item.name}
                                                                                type={'file'}
                                                                                depth={item.depth}
                                                                            />
                                                                        </>
                                                                        :
                                                                        <>
                                                                        </>
                                                                }
                                                            </>
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
            </div>
        </div>
    )
}