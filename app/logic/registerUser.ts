import { validateEmail, validatePassword, validateUserName, DuplicityError } from '../../com'
import { User } from '../data/models'


/**
 * 
 * @param {string} name user's name
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns Promise
 */

export default function registerUser (name: string, email: string, password: string) {
    validateUserName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, email, password, projects: [] })
        } catch(error: any) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}