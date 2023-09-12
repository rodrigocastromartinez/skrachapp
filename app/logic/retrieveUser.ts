import { validateId, ExistenceError } from '../../com'
import { User } from '../data/models'
import { UserModel } from '../data/interfaces'

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} User found
 */

export default function retrieveUser(userId: string) {
    validateId(userId)

    return (async () => {
            const user = await User.findById(userId).lean() as UserModel
    
            if (!user) throw new ExistenceError('user not found')

            return {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                description: user.description,
                projects: user.projects
            }
    })()
}