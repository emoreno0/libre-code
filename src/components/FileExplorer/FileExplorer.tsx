import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function FileExplorer() {
  const [currenState, setCurrentState] = useState<StateType | null>()

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  return (
    <div className="w-[200px] h-full min-h-screen border-r border-black">
      {
        currenState ?
          <>
            <p>
              {currenState.type}
            </p>
            <p>
              {currenState.path}
            </p>
            <p>
              {currenState.name}
            </p>
          </>
          : <></>
      }
    </div>
  )
}