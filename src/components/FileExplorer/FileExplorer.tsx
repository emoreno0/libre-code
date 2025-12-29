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
    <div className="w-[200px] h-full min-h-screen border-r border-black pl-2">
      {
        currentState ?
          <>
            <p>
              {currentState.name}
            </p>
            <br />
            { currentState.dirElements?.map((el) => (
              <p>
                <i className={`fa-xl fa-solid fa-${el.type} p-1`}></i>
                {el.name}
              </p>
            ))}
          </>
          : <></>
      }
    </div>
  )
}