import { retrieveUser, updateDescription } from "../logic/client"
import Button from "./Button"
import { UserModel } from "../data/interfaces"
import { useAppContext } from "../hooks"

interface DescriptionModalProps {
    setModal: (arg1: string | undefined) => void
    user: UserModel
    setUser: (arg1: UserModel | undefined) => void
}

export default function DescriptionModal({setModal, user, setUser}: DescriptionModalProps) {
    const { freeze, unfreeze, alert } = useAppContext()

    const handleCloseModal = () => setModal(undefined)

    const handleUpdateDescription = async (event: React.FormEvent<HTMLFormElement>) => {
        freeze()

        try{
            event.preventDefault()
    
            const description = event.currentTarget.description.value
    
            await updateDescription(description)
    
            const _user = await retrieveUser()
    
            setUser(_user)
    
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
            <form className="flex flex-col gap-4" onSubmit={handleUpdateDescription}>
                <textarea name="description" cols={30} rows={2} className="input" defaultValue={user.description || 'My description'}></textarea>
                <div className="flex gap-4">
                    <Button size='wide' type='primary' text='Save' submit={true}></Button>
                    <Button size='wide' type='no-fill' text='Cancel' onClick={handleCloseModal}></Button>
                </div>
            </form>
        </div>
    </section>
    </>
}