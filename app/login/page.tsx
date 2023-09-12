'use client'

import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { loginUser } from '../logic/client'
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import { useEffect } from 'react'
import context from '../logic/client/context'
import { useAppContext } from '../hooks'

const roboto = Roboto({ subsets: ['latin'], weight: ['300'] })

export default function Login() {
    const router = useRouter()

    const { freeze, unfreeze, alert } = useAppContext()

    useEffect(() => {
        freeze()
        try{
            if(context.token){
                router.push('/dashboard')
    
                unfreeze()
    
                return
            }
            unfreeze()
        } catch(error: any) {
            unfreeze()

            alert(error.message)
        }
    }, [])

    async function handleLogin(event: FormEvent) {
        event.preventDefault()

        freeze()

        const target = event.target as typeof event.target & {
            email: { value: string }
            password: { value: string }
        }

        const email = target.email.value
        const password = target.password.value

        try {
            await loginUser(email, password)

            console.log('user logged in')

            router.push('/dashboard')

            unfreeze()
        } catch (error: any) {
            unfreeze()

            alert(error.message)
        }
    }

    return <>
        {!context.token && <div className="flex min-h-screen min-w-screen flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-semibold">Login</h1>
        <form className="flex flex-col gap-4 items-center w-4/5" onSubmit={handleLogin}>
            <input className={`input ${roboto.className}`} type="email" name="email" placeholder="Email" />
            <input className={`input ${roboto.className}`} type="password" name="password" placeholder="Password" />
            <div className="flex items-center gap-0.5">
                <input className="h-4 w-4" type="checkbox" name="remember-me" />
                <div>Remember me</div>
            </div>
            <div>Forgot your <a className="text-blue-700">password</a>?</div>
            <div>Dont have an account? <Link href='/register' className='text-blue-700'>Register now</Link></div>
            <Button submit={true} size={"wide"} type={"primary"} text='Login'></Button>
        </form>
    </div>}
    </>
}