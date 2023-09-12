'use client'

import { useEffect, useState } from 'react'
import retrieveUser from '../logic/client/retrieveUser'
import { UserModel } from '../data/interfaces'
import AvatarModal from './AvatarModal'

interface AvatarProps {
  changeAvatar: () => void
  modal: string | undefined
  setModal: (arg1: string | undefined) => void
}

export default function Avatar({changeAvatar, modal, setModal}: AvatarProps) {
  const [user, setUser] = useState<UserModel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await retrieveUser()
        setUser(userData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <img src='https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'></img>
  }

  if (!user) {
    console.error('Error: Unable to retrieve user data.')

    return <img className={`box-border object-cover rounded-3xl`} src='https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg' onClick={changeAvatar}></img>
  }

  const handleAvatar = async () => {
    const userData = await retrieveUser()

    setUser(userData)
  }

  return <>
    {user.avatar && <img src={user.avatar} className={`box-border object-cover rounded-3xl`} onClick={changeAvatar} ></img> ||
    <img className={`box-border object-cover rounded-3xl`} src='https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg' onClick={changeAvatar}></img> }
    {modal === 'avatar' && <AvatarModal setModal={setModal} onSave={handleAvatar} ></AvatarModal>}
  </>
}