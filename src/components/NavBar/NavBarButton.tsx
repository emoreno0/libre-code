type Props = {
    onClick: () => {},
    text: string
}

export default function NavBarButton({onClick, text}: Props) {
  return (
    <button onClick={onClick}>
        {text}
    </button>
  )
}