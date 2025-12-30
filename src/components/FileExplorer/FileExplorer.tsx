import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function FileExplorer() {
  const [currentState, setCurrentState] = useState<StateType | null>()
  const [showDirElements, setShowDirElements] = useState(true)

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  const handleShowDirElements = () => {
    setShowDirElements(!showDirElements)
  }

  return (
    <div className="w-75 ml-14 h-full min-h-screen border-r border-black">
      {
        currentState ?
          <>
            <p onClick={handleShowDirElements} className="hover:bg-gray-600 p-1">
              <i className={`fa-md fa-solid fa-${currentState.type} p-1`}></i>
              {currentState.name}
            </p>
            {
              showDirElements && currentState.type == 'folder' ?
                <>
                  {currentState.dirElements?.map((el) => (
                    <p className="hover:bg-gray-600 p-1">
                      <i className={`fa-md fa-solid fa-${el.type} p-1 pl-3`}></i>
                      {el.name}
                    </p>
                  ))}
                </>
                : <></>
            }
          </>
          : <></>
      }
    </div>
  )
}