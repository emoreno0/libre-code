type Props = { content: string[] | undefined; isFile: boolean | undefined }
export default function CodeEditor({ content, isFile }: Props) {
    return (
        <div className="min-h-[200vh] min-w-fit w-screen ml-[20%] bg-[#14213d] pt-[10vh] pl-6">
            {content!= undefined && isFile ?
                <div autoCorrect='false'
                    spellCheck='false'
                    aria-selected='false'
                    contentEditable
                    className="min-w-full w-screen select-text text-white focus:outline-none"
                >
                    {content.map((line,key) => <p>{line}</p>)}
                </div>
                :
                <></>
            }
        </div>
    )
}