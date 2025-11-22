type Props = { content: string[] | undefined; isFile: boolean | undefined; selected: string | undefined }
export default function FileExplorer({ content, isFile, selected }: Props) {
    return (
        <div className="fixed bg-gray-400 w-[20%] mt-[7.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {
                content && !isFile ? (
                    content.map((cont) =>
                        <div className="w-full text-md p-0.5 hover:bg-gray-500 overflow-x-hidden">
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