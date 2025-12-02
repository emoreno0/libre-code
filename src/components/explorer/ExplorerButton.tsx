import { useEffect, useState } from 'react'

type Props = { name: string, type: 'file' | 'folder', depth: number, isProjectFolder?: boolean }

export default function ExplorerButton({ name, type, depth, isProjectFolder }: Props) {
    const [opened, setOpened] = useState<boolean | null>(null)

    useEffect(() => {
        if (type == 'folder') {
            setOpened(true)
        }
    }, [type])

    const handleOpened = () => {
        if (type == 'file') {
            return
        } else {
            setOpened(!opened)
        }
    }

    return (
        <div
            onClick={handleOpened}
            style={{ paddingLeft: `${depth * 8}px`, fontSize: `${isProjectFolder ? '18px' : '16px'}` }}
            className='overflow-x-hidden'
        >
            <p className='p-0.5 pl-2.5 hover:bg-[#203561] rounded-md'>
                {
                    type == 'folder' && !opened ? '▸ ' :
                        type == 'folder' && opened ? '▾ '
                            : ''
                }
                {name}
            </p>
        </div>
    )
}