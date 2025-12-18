import NavBarButton from "./NavBarButton"

export default function NavBar() {
  const openFile = () => window.electronAPI.openFile()
  const openFolder = () => window.electronAPI.openFolder()
  const openConfig = () => window.electronAPI.openConfig()

  return (
    <div className="h-screen w-[75px] border-r border-black">
      <div className="flex flex-col h-screen">
        <NavBarButton
        onClick={openFile}
        icon="file"
      />
      <NavBarButton
        onClick={openFolder}
        icon="folder"
      />
      <div className="mt-auto">
        <NavBarButton
        onClick={openConfig}
        icon="gear"
      />
      </div>
      </div>
    </div>
  )
}