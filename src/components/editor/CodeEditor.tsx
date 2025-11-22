type Props = { content: string[] | undefined; isFile: boolean | undefined }
export default function CodeEditor({ content, isFile }: Props) {
    return (
        <div className="min-h-[200vh] w-full ml-[20%] bg-white pt-[10vh] pl-6 mx-2">
            {content!= undefined && isFile ?
                <div autoCorrect='false'
                    spellCheck='false'
                    aria-selected='false'
                    contentEditable
                    className="min-w- select-text"
                >
                    {content.map((line,key) => <p>{line}</p>)}
                </div>
                :
                <></>
            }
        </div>
    )
}