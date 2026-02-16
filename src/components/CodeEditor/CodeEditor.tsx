import { useEffect, useState } from "react"
import { StateType } from "../../state/State"

export default function CodeEditor() {
  const [currentState, setCurrentState] = useState<StateType | null>()
  const [editedText, setEditedText] = useState<String>()
  const [lines, setLines] = useState(Number)

  useEffect(() => {
    window.electronAPI.onStateChanged((state) => {
      setCurrentState(state)
    })
  })

  useEffect(() => {
    setLines(currentState?.content ? currentState.content.split("\n").length : 0)
  }, [currentState?.content])

  useEffect(() => {
    if (editedText) {
      setLines(editedText?.split("\n").length)
    }
  }, [editedText])


  const handleEditedText = (e: string) => {
    setEditedText(e)
  }

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
            <textarea
              className="w-full min-h-screen mx-2 resize-none outline-none"
              onChange={(e) => handleEditedText(e.target.value)}
              suppressContentEditableWarning
              contentEditable
            >
              {currentState.content}
            </textarea>
          </div>
          : <></>
      }
    </div>
  )
}