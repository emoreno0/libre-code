import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function CodeEditor() {
  const [currentState, setCurrentState] = useState<StateType | null>()
  const [lines, setLines] = useState(Number)

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
    setLines(currentState?.content ? currentState.content.split("\n").length : 0)
  })

  return (
    <div className="h-full min-h-screen w-full">
      {
        currentState ?
          <div className="flex my-1.5">
            <div className="mx-2">
              {
                Array.from({ length: lines }, (_, index) => (
                  <p>
                    {index + 1}
                  </p>
                ))
              }
            </div>
            <pre>
              <code>
                {currentState.content}
              </code>
            </pre>
          </div>
          : <></>
      }
    </div>
  )
}