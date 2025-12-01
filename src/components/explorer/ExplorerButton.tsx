import { useState } from "react"

type Props = { name: string, type: 'file' | 'folder', depth: number, isProjectFolder?: boolean }

export default function ExplorerButton({ name, type, depth, isProjectFolder }: Props) {
    const [opened, setOpened] = useState<boolean>(false)

    const handleOpened = () => {
        setOpened(!opened)
    }

    return (
        <div onClick={type == 'folder' ? () => { handleOpened() } : () => { }} style={{ paddingLeft: `${depth * 8}px`, fontSize: `${isProjectFolder ? '18px' : '16px'}` }}
            className="overflow-x-hidden">
            <p className="p-0.5 pl-2.5 hover:bg-[#203561] rounded-md">
                {
                    type == 'folder' && opened || type == 'folder' && opened && isProjectFolder ? '▸ ' :
                        type == 'folder' && !opened || type == 'folder' && opened && isProjectFolder ? '▾ '
                            : ''
                }
                {name}
            </p>
        </div>
    )
}