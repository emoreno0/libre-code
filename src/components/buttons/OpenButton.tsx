type Props = { onClick?: () => void; buttonOptions: string };

export default function OpenButton({ onClick, buttonOptions }: Props) {
    return (
        <button onClick={onClick} className="h-full p-2 hover:bg-[#203561] text-sm text-gray-100">
            {buttonOptions === 'file' ?
                <span>Open file</span>
                : buttonOptions === 'folder' ?
                    <span>Open folder</span>
                    :
                    <span>Remove</span>
            }
        </button>
    )
}