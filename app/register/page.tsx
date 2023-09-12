'use client'

import Link from 'next/link'
import { Roboto } from 'next/font/google'
import Container from '../library/Container'
import registerUser from '../logic/client/registerUser'
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import { useEffect } from 'react'
import context from '../logic/client/context'
import { useAppContext } from '../hooks'

const roboto = Roboto({ subsets: ['latin'], weight: ['300'] })

export default function Register() {
    const router = useRouter()

    const { freeze, unfreeze, alert } = useAppContext()

    useEffect(() => {
        freeze()
        try{
            if(context.token){
                router.push('/dashboard')
    
                return
            }
            unfreeze()
        } catch(error: any) {
            unfreeze()
            
            alert(error.message)
        }
    }, [])

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            name: { value: string }
            email: { value: string }
            password: { value: string }
        }

        const username = target.name.value
        const email = target.email.value
        const password = target.password.value

        try {
            await registerUser(email, username, password)

            console.log('user registered')

            router.push('/login')
        } catch (error: any) {
            alert(error.message)
        }
    }

    return <>
    {!context.token && <Container tag="div" className='flex min-h-screen min-w-screen flex-col justify-center items-center gap-4'>
        <h1 className="text-4xl font-semibold">Register</h1>
        <form className="flex flex-col gap-4 items-center w-4/5" onSubmit={handleRegister} >
            <input className={`input ${roboto.className}`} type="text" name="name" placeholder="User name" />
            <input className={`input ${roboto.className}`} type="email" name="email" placeholder="Email" />
            <input className={`input ${roboto.className}`} type="password" name="password" placeholder="Password" />
            <div>Already registered? <Link href='/login' className='text-blue-700'>Sign in</Link></div>
            <Button submit={true} size={"wide"} type={"primary"} text='Register'></Button>
        </form>
    </Container>}
    </>
}