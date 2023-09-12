import { Dispatch, SetStateAction } from "react"

interface SettingsProps {
    onChangePasswordClicked: () => void
    setModal: Dispatch<SetStateAction<string | undefined>>
}

export default function Settings({ onChangePasswordClicked, setModal }: SettingsProps) {
    const handleCloseModal = () => setModal(undefined)
    
    return <section className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col gap-4 justify-center items-center z-30">
        <div className={"w-4/5 max-w-xs h-fit p-8 m-0 rounded-3xl bg-[var(--grey-700)] flex flex-col gap-4"}>
            <div className="flex justify-between items-center border-b border-solid border-[var(--grey-500)] pb-2" >
                <p className={`font-semibold text-lg text-[var(--orange-300)]`}>SETTINGS</p>
                <span className="material-symbols-outlined text-[var(--grey-500)]" onClick={handleCloseModal} >close</span>
            </div>
            <div className="flex flex-col" >
            <p className='m-0 pb-2 self-center text-lg text-[var(--grey-500)]' onClick={onChangePasswordClicked} >Change password</p>
            <p className='m-0 pb-2 self-center text-lg text-[var(--grey-500)]'>Change email</p>
            <p className='m-0 pb-2 self-center text-lg text-[var(--grey-500)]'>Delete account</p>
            </div>
        </div>
    </section>
}