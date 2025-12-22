import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function CodeEditor() {
  const [currenState, setCurrentState] = useState<StateType | null>()

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  return (
    <div className="h-full min-h-screen w-full">
      {
        currenState ?
          <>
            {
              currenState.content
            }
          </>
          : <></>
      }
    </div>
  )
}