type Props = { name: string, type: 'file' | 'folder' }
export default function ExplorerButton({ name, type }: Props) {
    return (
        <div className="ml-1.5 w-full text-md overflow-x-hidden">
            <p className="p-0.5 hover:bg-[#203561] rounded-md">
                {type == 'folder' ? "📁 " : "📄 "}
                {name}
            </p>
        </div>
    )
}
