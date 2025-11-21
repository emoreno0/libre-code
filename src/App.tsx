export default function App() {
  const openFile = async () => {
    await window.electronAPI.openPath('file')
  }

  const openFolder = async () => {
    await window.electronAPI.openPath('folder')
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