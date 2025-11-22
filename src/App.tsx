import { useState } from "react"

export default function App() {
  const [isFile, setIsFile] = useState<Boolean | undefined>(undefined)
  const [content, setContent] = useState<string[] | undefined>(undefined)
  const [path, setPath] = useState<string | undefined>(undefined)

  const openFile = async () => {
    const openFile = await window.electronAPI.openPath('file')
    setContent(openFile.content?.split("\n"))
    setPath(openFile.path)
    setIsFile(true)
  }

  const openFolder = async () => {
    const openFolder = await window.electronAPI.openPath('folder')
    setPath(openFolder.path)
    setContent(openFolder.folderList)
    setIsFile(false)
  }

  const removeValues = () => {
    setContent(undefined)
    setPath(undefined)
  }

  return (
    <div className="block p-4 space-y-4 space-x-4">
      <button onClick={openFile} className="p-1 text-lg bg-black text-white rounded-md select-none">
        Open file
      </button>
      <button onClick={openFolder} className="p-1 text-lg bg-black text-white rounded-md select-none">
        Open folder
      </button>
      {content && path != undefined ?
        <button onClick={removeValues} disabled={!content} className="p-1 text-lg bg-black text-white rounded-md select-none">
          Remove
        </button> : <></>
      }
      <div className="text-black space-y-4 font-mono text-sm whitespace-pre-wrap">
        <div>
          {content ? (
            content.map((phrase, key) => <>{
              isFile ?
                <span className="select-text"><span className="select-none">{key + 1} </span>{phrase}<br /></span>
                :
                <p className="select-none">{phrase}</p>}</>)
          ) : (
            <p>No content to show</p>
          )}
        </div>
        {path ?
          <p className="select-none">Path: {path}</p>
          :
          <p>No path to show</p>
        }
      </div>
    </div>
  )
}