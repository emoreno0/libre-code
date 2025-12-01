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
            <p className="p-1 hover:bg-[#203561] rounded-md">
                &nbsp;
                {
                    type == 'folder' && opened ? '▸ ' :
                        type == 'folder' && !opened ? '▾ '
                            : ''
                }
                {name}
            </p>
        </div>
    )
}