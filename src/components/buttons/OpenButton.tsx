type Props = {
    onClick: () => {},
    text: string
}

export default function OpenButton({ onClick, text }: Props) {
    return (
        <button
            onClick={onClick}
            className="h-full p-1 hover:bg-[#203561] text-sm text-gray-100"
        >
            {text}
        </button>
    )
}