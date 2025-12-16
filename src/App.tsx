import CodeEditor from "./components/CodeEditor/CodeEditor"
import FileExplorer from "./components/FileExplorer/FileExplorer"
import NavBar from "./components/NavBar/NavBar"

function App() {
  return (
    <div className="flex">
      <NavBar/>
      <FileExplorer/>
      <CodeEditor/>
    </div>
  )
}

export default App
