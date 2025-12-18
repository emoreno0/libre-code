import NavBarButton from "./NavBarButton"

export default function NavBar() {
  const openFile = () => window.electronAPI.openFile()
  const openFolder = () => window.electronAPI.openFolder()
  const openConfig = () => window.electronAPI.openConfig()

  return (
    <div className="bg-blue-500 h-screen w-[75px] border-r-2 border-black">
      <NavBarButton
        onClick={openFile}
        text="File"
      />
      <NavBarButton
        onClick={openFolder}
        text="Folder"
      />
      <NavBarButton
        onClick={openConfig}
        text="Config"
      />
    </div>
  )
}