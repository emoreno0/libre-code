type Props = { content: string[] | undefined; isFile: boolean | undefined; selected: string | undefined }
export default function FileExplorer({ content, isFile, selected }: Props) {

    return (
        <div className="min-w-[20vw] h-screen p-4 border-x border-black overflow-y-hidden select-none">
            {
                content && !isFile ? (
                    content.map((cont) => <p>{cont}</p>)
                ) : (
                    <span>
                        {selected}
                    </span>
                )
            }
        </div>
    )
}