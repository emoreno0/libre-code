import NavBarButton from "./NavBarButton"

export default function NavBar() {
  const openFile = () => window.electronAPI.openFile()
  const openFolder = () => window.electronAPI.openFolder()
  const openConfig = () => window.electronAPI.openConfig()

  return (
    <div className="bg-blue-500 h-screen w-[75px] border-r-2 border-black">
      <div className="flex flex-col h-screen">
        <NavBarButton
        onClick={openFile}
        type="file"
      />
      <NavBarButton
        onClick={openFolder}
        type="folder"
      />
      <div className="mt-auto">
        <NavBarButton
        onClick={openConfig}
        type="config"
      />
      </div>
      </div>
    </div>
  )
}