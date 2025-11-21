export default function App() {
  const openFile = async () => {
    const openFile = await window.electronAPI.openPath('file')
    const splitFileContent = openFile.content?.split("\n")
    console.log(splitFileContent, openFile.path)
  }

  const openFolder = async () => {
    const openFolder = await window.electronAPI.openPath('folder')
    console.log(openFolder)
  }

  return (
    <div className="p-4 flex gap-4">
      <button onClick={openFile} className="text-lg bg-black text-white rounded-lg">
        Open file
      </button>
      <button onClick={openFolder} className="text-lg bg-black text-white rounded-lg">
        Open folder
      </button>
    </div>
  )
}