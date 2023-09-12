import { User } from '../data/models'
import { validateId, ExistenceError } from '../../com'

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} The project
 */

export default function retrieveUserEmail(userId: string, userToFind: string) {
    validateId(userId)
    validateId(userToFind)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const _user = await User.findById(userToFind)

        if (!_user) throw new ExistenceError(`user with id ${userToFind} not found`)

        return _user.email
    })()
}