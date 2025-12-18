type Props = {
  onClick: () => {},
  type: 'file' | 'folder' | 'config'
}

export default function NavBarButton({ onClick, type }: Props) {
  return (
    <button
    className="w-full h-12 hover:bg-blue-400"
      onClick={onClick}
    >
      {
        type == 'file' ? <i className="fa-xl fa-solid fa-file"></i> :
          type == 'folder' ? <i className="fa-xl fa-solid fa-folder"></i> :
            type == 'config' ? <i className="fa-xl fa-solid fa-gear"></i> :
              <i className="fa-xl fa-solid fa-question"></i>
      }
    </button>
  )
}