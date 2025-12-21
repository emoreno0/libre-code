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
    <div className="w-[150px] h-full min-h-screen border-r border-black">
        FileExplorer

        <button onClick={() => console.log(currenState?.path)}>
          Print Path
        </button>
    </div>
  )
}