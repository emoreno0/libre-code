type Props = {
  onClick: () => {},
  icon: 'file' | 'folder' | 'gear' | 'delete-left' | 'floppy-disk'
}

export default function NavBarButton({ onClick, icon }: Props) {
  return (
    <button
    className="w-full h-12 hover:bg-gray-600"
      onClick={onClick}
    >
      <i className={`fa-xl fa-solid fa-${icon}`}></i>
    </button>
  )
}