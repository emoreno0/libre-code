import FileExplorer from "./components/FileExplorer"
import CodeEditor from "./components/editor/CodeEditor"
import NavBar from "./components/NavBar"

export default function App() {
  return (
    <>
      <NavBar />
      <FileExplorer />
      <CodeEditor />
    </>
  )
}