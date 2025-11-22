type Props = { onClick?: () => void; buttonOptions: string };
export default function OpenButton({ onClick, buttonOptions }: Props) {
    return (
        <button onClick={onClick} className="p-0.5 text-md bg-black text-white rounded-md select-none">
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