type Props = { onClick?: () => void; ButtonOptions: string };
export default function OpenButton({ onClick, ButtonOptions }: Props) {
    return (
        <button onClick={onClick} className="p-1 text-lg bg-black text-white rounded-md select-none">
            {ButtonOptions === 'file' ?
                <span>Open file</span>
                : ButtonOptions === 'folder' ?
                    <span>Open folder</span>
                    :
                    <span>Remove</span>
            }
        </button>
    )
}