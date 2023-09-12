'use client'

import { useState } from 'react'
import {createProject, retrieveUser, retrieveUserProjects, retrieveProject, retrieveUserEmail } from "../logic/client"
import { Edition, Button, SearchBar, ProfileData, Projects, NavigationBar, AvatarModal, MembersModal, DescriptionModal, Settings } from '../components'
import logoutUser from '../logic/client/logoutUser'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../hooks'
import { UserModel } from '../data/interfaces'
import { useEffect } from 'react'
import { ProjectModel, TrackModel } from '../data/interfaces'
import { getStorage, ref, deleteObject } from "firebase/storage"
import PasswordModal from '../components/PasswordModal'

export default function Home() {
    const [edition, setEdition] = useState(false)
    const [projectId, setProjectId] = useState<string | undefined>()
    const [modal, setModal] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<UserModel>()
    const [projects, setProjects] = useState<[ProjectModel]>()
    const [owners, setOwners] = useState<{id: string, email: string}[]>()
    const [trackData, setTrackData] = useState<TrackModel>()
    const [search, setSearch] = useState<string>('')

    const { freeze, unfreeze, alert } = useAppContext()

    useEffect(() => {
        freeze()
        try {
            (async () => {
                const user = await retrieveUser()

                const projects = await retrieveUserProjects()
    
                setUser(user)

                setProjects(projects)

                unfreeze()
            })()
        } catch(error: any) {
            unfreeze()
            alert(error.message)
        }
    }, [])

    const router = useRouter()

    const handleNewProject = async () => {
        try {
            const res = await createProject()

            const user = await retrieveUser()

            setUser(user)

            setProjectId(res.id)

            setEdition(true)
        } catch(error: any){
            alert(error.message)
        }
    }

    const handleGoBack = async () => {
        freeze()
        try {
            setProjectId(undefined)
    
            const projects = await retrieveUserProjects()
    
            setEdition(false)
            
            setProjects(projects)

            unfreeze()
        } catch(error: any) {
            unfreeze()

            alert(error.message)
        }
    }

    const handleLogout = () => {
        freeze()

        try {
            logoutUser()
    
            router.push('/login')

            unfreeze()
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleChangeAvatar = () => {
        setModal('avatar')
    }

    const handleProjectSelected = (id: string) => {
        freeze()
        try{
            (async () => {
                const project = await retrieveProject(id)
                
                setProjectId(id)

                setEdition(true)

                unfreeze()
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleAddMember = async (projectId: string) => {
        freeze()
        try {
            const project = await retrieveProject(projectId)
    
            const owners = await Promise.all(project.owners.map(async (owner: string) => {
                const email = await retrieveUserEmail(owner)
                
                return {id: owner, email}
            }))

            setOwners(owners)
            
            setModal('members')

            unfreeze()
        } catch(error: any) {
            unfreeze()

            alert(error.message)
        }

    }

    const handleSelectInstrument = (trackData: TrackModel) => {
        setTrackData(trackData)

        setModal('instrument')
    }

    const handleSetPasswordModal = () => setModal('password')

    const handleChangePassword = () => {}

    return <>
            <NavigationBar onLogoutClicked={handleLogout} setModal={setModal} ></NavigationBar>
    {!edition && user && projects && <div className="absolute top-16 w-screen h-screen flex flex-col px-8 gap-4">
        <div className='relative pt-4 flex flex-col gap-4'>
        <div>
            <ProfileData onAvatarChange={handleChangeAvatar} setModal={setModal} setUser={setUser} user={user} modal={modal} ></ProfileData>
        </div>
        <div className="flex gap-4" >
            <SearchBar onChange={(e) => setSearch(e.target.value)}></SearchBar>
            <Button size='fit' type='no-fill' rounded={true} text={'New'} onClick={handleNewProject}></Button>
        </div>
        <div>
            <Projects projects={projects} onProjectSelected={handleProjectSelected} search={search} ></Projects>
        </div>
        </div>
    </div>}

    {edition && projectId &&  <Edition onGoBack={handleGoBack} projectId={projectId} modal={modal} onAddMemberClicked={handleAddMember} onSelectInstrument={handleSelectInstrument} /> }

    {/* {modal === 'avatar' && <AvatarModal setModal={setModal} ></AvatarModal>} */}

    {modal === 'members' && owners && projectId && <MembersModal projectId={projectId} setModal={setModal} owners={owners} ></MembersModal>}

    {modal === 'description' && user && <DescriptionModal user={user} setModal={setModal} setUser={setUser} />}

    {modal === 'settings' && <Settings onChangePasswordClicked={handleSetPasswordModal} setModal={setModal} ></Settings>}

    {modal === 'password' && <PasswordModal setModal={setModal} ></PasswordModal>}
    </>
}