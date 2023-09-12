'use client'

import { updatePassword } from "../logic/client"
import Button from "./Button"
import { useAppContext } from "../hooks"

interface AvatarModalProps {
    setModal: (arg1: string | undefined) => void
}

export default function PasswordModal({ setModal }: AvatarModalProps) {
    const { freeze, unfreeze, alert } = useAppContext()

    const handleCloseModal = () => setModal(undefined)

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        freeze()

        try{
            event.preventDefault()

            const password = event.currentTarget.password.value
            console.log(password)
            const newPassword = event.currentTarget.newpass.value
            console.log(newPassword)
            const newPasswordRepeated = event.currentTarget.newpassrepeated.value
            console.log(newPasswordRepeated)
            await updatePassword(password, newPassword, newPasswordRepeated)

            setModal(undefined)

            unfreeze()
        } catch(error: any) {
            unfreeze()

            alert(error.message)
        }
    }

    return <>
    <section className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col gap-4 justify-center items-center z-30 ">
        <div className="p-4 bg-[var(--grey-700)] rounded-2xl flex flex-col gap-1 w-4/5 h-fit">
            <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
                <input type="password" className="input" name="password" placeholder="Insert current password" autoComplete="off" />
                <input type="password" className="input" name="newpass" placeholder="Insert new password" autoComplete="off" />
                <input type="password" className="input" name="newpassrepeated" placeholder="Repeat new password" autoComplete="off" />
                <div className="flex gap-4">
                    <Button size='wide' type='primary' text='Save' submit={true}></Button>
                    <Button size='wide' type='no-fill' text='Cancel' onClick={handleCloseModal}></Button>
                </div>
            </form>
        </div>
    </section>
    </>
}