import { User } from '../data/models'
import { validateId, ExistenceError, validateText } from '../../com'

/**
 * 
 * @param {string} userId user's id
 * @param {string} description user's description
 * @returns Promise<>
 */

export default function updateDescription(userId: string, description: string) {
    validateId(userId)
    validateText(description)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        return User.updateOne({ _id: userId }, { $set: { description } })
    })()
}