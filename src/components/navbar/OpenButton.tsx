type Props = {
    onClick: () => {},
    type: 'file' | 'folder' | 'remove' | 'save' | 'config'
}

export default function OpenButton({ onClick, type }: Props) {
    return (
        <button
            onClick={onClick}
            className={`min-h-12 w-full hover:bg-[#203561] text-sm text-gray-100`}
        >
            <div>
                {
                    type == 'file' ? <i className='fa-solid fa-file fa-xl'></i> :
                        type == 'folder' ? <i className='fa-solid fa-folder fa-xl'></i> :
                            type == 'remove' ? <i className='fa-solid fa-delete-left fa-xl'></i> :
                                type == 'save' ? <i className='fa-solid fa-floppy-disk fa-xl'></i> :
                                    type == 'config' ? <i className='fa-solid fa-gear fa-xl'></i> :
                                        type
                }
            </div>
        </button>
    )
}