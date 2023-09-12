import { validateEmail, validatePassword } from '../../../com'
import context from './context'

/**
 * Authenticates a user by email and password
 * @param {string} email user's email
 * @param {string} password user's password
 */

export default function loginUser(email: string, password: string) {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/auth`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.status !== 200){
            const { message } = await res.json()

            throw new Error(message)
        }
        
        context.token = await res.json()
    })()
}