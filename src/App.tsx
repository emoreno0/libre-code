import { useState } from "react"
import FileExplorer from "./components/FileExplorer"
import OpenButton from "./components/buttons/OpenButton"
import CodeEditor from "./components/editor/CodeEditor"

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
    <div className="flex w-full bg-gray-500">
      <FileExplorer content={content} isFile={isFile} selected={selected} />
      <div className="w-full block m-1 space-y-4 space-x-1">
        <OpenButton onClick={openFile} ButtonOptions='file' />
        <OpenButton onClick={openFolder} ButtonOptions='folder' />
        {
          content ?
            <OpenButton onClick={removeValues} ButtonOptions='remove' /> : <></>
        }
        <div className="text-black space-y-4 ml-6 text-sm whitespace-pre-wrap">
            <CodeEditor content={content} isFile={isFile}/>
        </div>
      </div>
    </div>
  )
}