import { useState } from "react"
import FileExplorer from "./components/FileExplorer"
import OpenButton from "./components/buttons/OpenButton"

export default function App() {
  const [isFile, setIsFile] = useState<boolean | undefined>(undefined)
  const [content, setContent] = useState<string[] | undefined>(undefined)
  const [path, setPath] = useState<string | undefined>(undefined)
  const selected = path?.split("/").at(-1)

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
    setIsFile(undefined)
  }

  return (
    <div className="flex">
      <FileExplorer content={content} isFile={isFile} selected={selected} />
      <div className="block m-4 space-y-4 space-x-4">
        <OpenButton onClick={openFile} ButtonOptions='file' />
        <OpenButton onClick={openFolder} ButtonOptions='folder' />
        {
          content ?
            <OpenButton onClick={removeValues} ButtonOptions='remove' /> : <></>
        }
        <div className="text-black space-y-4 font-mono text-sm whitespace-pre-wrap">
          <div>
            {content && isFile ? (
              content.map((phrase, key) => <>{
                isFile ?
                  <span className="select-text"><span className="select-none">{key + 1} </span>{phrase}<br /></span>
                  :
                  <p className="select-none">{phrase}</p>}</>)
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}