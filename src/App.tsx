import { useState } from "react"
import FileExplorer from "./components/FileExplorer"
import CodeEditor from "./components/editor/CodeEditor"
import NavBar from "./components/NavBar"

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
    <div className="flex w-full h-full">
      <NavBar
        content={content}
        openFile={openFile}
        openFolder={openFolder}
        removeValues={removeValues}
      />
      <FileExplorer content={content} isFile={isFile} selected={selected} />
      <CodeEditor content={content} isFile={isFile} />
    </div>
  )
}