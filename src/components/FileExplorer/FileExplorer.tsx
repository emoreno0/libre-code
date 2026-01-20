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
    <div className="w-85 ml-14 h-full min-h-screen border-r border-black">
      {
        currentState ?
          <>
            <p className="hover:bg-gray-600 p-1">
              <i className={`fa-md fa-solid fa-${currentState.type} p-1`}></i>
              {currentState.name}
            </p>
            {
              currentState.type == 'folder' ?
                <>
                  {
                    currentState.folderList?.map((el) => (
                      <>
                        <p className="hover:bg-gray-600 p-1" style={{ paddingLeft: `${el.depth * el.depth - 45}px` }}>
                          <i className={`fa-md fa-solid fa-${'folder'} p-1 pl-3`}></i>
                          {el.name}
                        </p>
                        {
                          currentState.fileList?.map((sub) => (
                            <>
                              {
                                el.path == sub.parent ?
                                  <p className="hover:bg-gray-600 p-1" style={{ paddingLeft: `${sub.depth * sub.depth - 45}px` }}>
                                    <i className={`fa-md fa-solid fa-${sub.type} p-1 pl-3`}></i>
                                    {sub.name}
                                  </p>
                                  : <></>
                              }
                            </>
                          ))
                        }
                      </>
                    ))
                  }
                  {
                    currentState.fileList?.map((el) => (
                      <>
                        {
                          el.parent == currentState.path ?
                            <p className="hover:bg-gray-600 p-1" style={{ paddingLeft: `${el.depth * el.depth - 45}px` }}>
                              <i className={`fa-md fa-solid fa-${'file'} p-1 pl-3`}></i>
                              {el.name}
                            </p>
                            : <></>
                        }
                      </>
                    ))
                  }
                </>
                : <></>
            }
          </>
          : <></>
      }
    </div>
  )
}