import FileExplorer from './components/explorer/FileExplorer'
import CodeEditor from './components/editor/CodeEditor'
import NavBar from './components/navbar/NavBar'

export default function App() {
  return (
    <>
      <NavBar />
      <FileExplorer />
      <CodeEditor />
    </>
  )
}