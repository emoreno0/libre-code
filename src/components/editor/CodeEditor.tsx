type Props = { content: string[] | undefined; isFile: boolean | undefined }
export default function CodeEditor({ content, isFile }: Props) {
    return (
        <div className="min-h-[200vh]">
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