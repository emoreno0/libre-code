type Props = { content: string[] | undefined; isFile: boolean | undefined; selected: string | undefined }
export default function FileExplorer({ content, isFile, selected }: Props) {
    return (
        <div className="relative min-w-[175px] w-[12.5%] h-screen p-1 border-x border-black select-none overflow-hidden whitespace-nowrap">
            {
                content && !isFile ? (
                    content.map((cont) =>
                        <div className="w-full text-md p-0.5 border border-transparent hover:border-black overflow-x-hidden">
                            {cont}
                        </div>
                    )
                ) :  selected ? (
                    <div className="w-full text-md p-0.5 border border-transparent hover:border-black overflow-x-hidden">
                        {selected}
                    </div>
                ) : <></>
            }
        </div>
    )
}