type Props = { name: string, type: 'file' | 'folder' | 'projectName', depth: number }
export default function ExplorerButton({ name, type, depth }: Props) {
    return (
        <div style={{paddingLeft: `${depth * 8}px`}}
        className="ml-0.5 w-full text-md overflow-x-hidden">
            <p className="p-0.5 hover:bg-[#203561] rounded-md">
                {type == 'folder' ? "📁 ": type == 'file' ? "📄 " : "🛠️ "}
                {name}
            </p>
        </div>
    )
}
