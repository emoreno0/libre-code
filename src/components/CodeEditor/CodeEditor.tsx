import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function CodeEditor() {
  const [currentState, setCurrentState] = useState<StateType | null>()

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  return (
    <div className="h-full min-h-screen w-full">
      {
        currentState ?
          <>
            {
              currentState.content
            }
          </>
          : <></>
      }
    </div>
  )
}