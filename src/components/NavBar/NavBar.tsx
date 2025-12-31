import { useEffect, useState } from "react"
import NavBarButton from "./NavBarButton"
import { StateType } from "../../state/State"

export default function NavBar() {
  const openFile = () => window.electronAPI.openFile()
  const openFolder = () => window.electronAPI.openFolder()
  const openConfig = () => window.electronAPI.openConfig()
  const clearState = () => window.electronAPI.clearState()
  const saveContent = () => window.electronAPI.saveContent()

  const [currentState, setCurrentState] = useState<StateType | null>()

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  return (
    <div className="fixed h-screen w-14 border-r border-black">
      <div className="flex flex-col h-screen">
        <NavBarButton
          onClick={openFile}
          icon="file"
        />
        <NavBarButton
          onClick={openFolder}
          icon="folder"
        />
        {
          currentState ?
            <>
            <NavBarButton
              onClick={clearState}
              icon="delete-left"
            />
            <NavBarButton
              onClick={saveContent}
              icon="floppy-disk"
            />
            </>
            : <></>
        }
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