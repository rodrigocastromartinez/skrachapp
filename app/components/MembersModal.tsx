import Button from "./Button"
import { retrieveProject, retrieveUserEmail, addMember, extractUserId, retrieveUser, deleteMember } from "../logic/client"
import { FormEvent, useEffect, useState } from "react"
import { Chip } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { useAppContext } from "../hooks"

interface MembersModalParams {
    projectId: string
    setModal: Dispatch<SetStateAction<string | undefined>>
    owners: {id: string, email: string}[]
}

export default function MembersModal({ projectId, setModal, owners }: MembersModalParams) {
    const [ownersData, setOwnersData] = useState<{ id: string, email: string }[]>()
    const [emailInput, setEmailInput] = useState('')

    const { alert } = useAppContext()

    useEffect(() => {
            try {
                setOwnersData(owners)
            } catch(error: any) {
                alert(error.message)
            }
    }, [])

    const handleAdd = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const target = event.target as typeof event.target & {
                email: {value: string}
            }
    
            console.log(target.email.value)
    
            const res = await addMember(projectId, target.email.value)

            const owners = await Promise.all(res.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwnersData(owners)

            setEmailInput('')
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleDelete = async (owner: { id: string, email: string }) => {
        try {
            const project = await retrieveProject(projectId)

            const user = await retrieveUser()
    
            if(project.owners.length <= 1 || user.email === owner.email) return

            const res = await deleteMember(projectId, owner.id)

            const owners = await Promise.all(res.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwnersData(owners)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => setModal(undefined)
    
    return <>
    <div className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col justify-center items-center z-30 ">
        <div className="p-4 bg-[var(--grey-700)] rounded-2xl flex flex-col gap-1 w-4/5 h-fit">
            <form className="flex flex-col gap-2" onSubmit={handleAdd} >
                <input name="email" className="input" placeholder="Email" value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
            <div className="flex gap-2 mt-1">
                <Button size='wide' type='primary' text={'Add'} submit={true} ></Button>
                <Button size='wide' type='no-fill' text='Cancel' onClick={handleCloseModal}></Button>
            </div>
            <div className="flex flex-col" >
                {ownersData && ownersData.map(owner => {
                    return <Chip 
                    key={owner.id} 
                    label={owner.email} 
                    onDelete={() => handleDelete(owner)}
                    sx={{
                        backgroundColor: 'var(--grey-500)',
                        color: 'var(--grey-700)',
                        fontSize: '16px',
                        width: 'fit-content',
                        margin: '0.25rem'
                    }}
                    ></Chip>
                } )}
            </div>
            </form>
        </div>
    </div>
    </>
}