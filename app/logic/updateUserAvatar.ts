import { User } from '../data/models'
import { validateId, validateUrl, ExistenceError } from '../../com'

/**
 * 
 * @param {string} userId user's id
 * @param {string} avatarUrl user's avatar url
 * @returns Promise<>
 */

export default function updateUserAvatar (userId: string, avatarUrl: string) {
    validateId(userId)
    validateUrl(avatarUrl)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        return await User.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } })
    })()
}