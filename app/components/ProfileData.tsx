'use client'

import Avatar from "./Avatar"
import { useState, useEffect } from "react"
import { UserModel } from "../data/interfaces"

  interface ProfileDataProps {
    onAvatarChange: () => void
    setModal: (arg1: string | undefined) => void
    user: UserModel | undefined
    setUser: (arg1: UserModel | undefined) => void
    modal: string | undefined
  }

export default function ProfileData({ onAvatarChange, setModal, setUser, user, modal }: ProfileDataProps) {
    useEffect(() => {
      const fetchData = (async () => {
          setUser(user)
      })()
    }, [])

    const handleEditDescription = () => {
      setModal('description')
    }

    return <>
    {user && <div className="flex items-center gap-4">
        <div className="h-24 w-24">
            <Avatar changeAvatar={onAvatarChange} modal={modal} setModal={setModal} ></Avatar>
        </div>
        <div>
            <p className="font-semibold text-slate-300 text-lg" >{user.name}</p>
            <div className="flex gap-1" >
              <p className="font-normal text-slate-400">{user.description || 'My description'}</p>
              <span className="material-symbols-outlined text-slate-400" onClick={handleEditDescription} >edit</span>
            </div>
            <div className="flex gap-1 items-center"><p className="text-lg text-slate-300" >{user.projects.length}</p><p className="text-slate-400" >{user.projects.length === 1 ? 'project' : 'projects'}</p></div>
        </div>
    </div>}
    </>
}