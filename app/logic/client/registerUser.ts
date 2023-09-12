console.debug('load register user')
import { validateUserName, validateEmail, validatePassword } from '../../../com/index'

/**
 * Registers a new user
 * @param {string} email user's email
 * @param {string} name username
 * @param {string} password user's password
 */

export default function registerUser(email : string, name : string, password : string) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        // const res = await fetch(`${process.env.URL}/users`, {
        const res = await fetch(`http://localhost:3000/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        if(res.status === 200)
            return

        const { message } = await res.json()

        throw new Error(message)
    })()
}