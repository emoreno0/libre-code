import OpenButton from "./buttons/OpenButton"

type Props = {
    openFile?: () => {},
    openFolder?: () => {};
    removeValues?: () => void;
    content: string[] | undefined
}

export default function NavBar({ openFile, openFolder, removeValues, content }: Props) {
    return (
        <div className="fixed w-screen h-[6.5vh] bg-[#14213d] border border-black z-10">
            <div className="flex h-full items-center">
                <OpenButton onClick={openFile} buttonOptions='file' />
                <OpenButton onClick={openFolder} buttonOptions='folder' />
                {
                    content ?
                        <OpenButton onClick={removeValues} buttonOptions='remove' />
                        :
                        <></>
                }
            </div>
        </div>
    )
}

