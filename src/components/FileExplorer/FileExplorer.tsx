import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function FileExplorer() {
  const [currentState, setCurrentState] = useState<StateType | null>()

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  return (
    <div className="w-[200px] h-full min-h-screen border-r border-black">
      {
        currentState ?
          <>
            <p>
              {currentState.type}
            </p>
            <p>
              {currentState.path}
            </p>
            <p>
              {currentState.name}
            </p>
          </>
          : <></>
      }
    </div>
  )
}