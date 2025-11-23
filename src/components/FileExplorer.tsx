type Props = { content: string[] | undefined; isFile: boolean | undefined; selected: string | undefined }

export default function FileExplorer({ content, isFile, selected }: Props) {
    return (
        <div className="fixed text-sm bg-[#14213d] w-[20%] mt-[6.5vh] h-screen border-x border-black select-none overflow-hidden whitespace-nowrap">
            {!isFile && content ? <div className="pl-2 text-gray-100 w-full p-0.5 hover:bg-[#203561] overflow-x-hidden">
                {selected}
            </div> : <></>}
            {
                content && !isFile ? (
                    content.map((cont, key) =>
                        <div key={key} className="pl-4 text-gray-100 w-full text-md p-0.5 hover:bg-[#203561] overflow-x-hidden">
                            {cont}
                        </div>
                    )
                ) : selected ? (
                    <div className="pl-4 text-gray-100 w-full text-md p-0.5 hover:bg-[#203561] overflow-x-hidden">
                        {selected}
                    </div>
                ) : <></>
            }
        </div>
    )
}