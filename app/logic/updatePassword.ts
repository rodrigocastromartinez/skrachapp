import { User } from '../data/models'
import { validateId, ExistenceError, validatePassword, ContentError, AuthError } from '../../com'

/**
 * 
 * @param {string} userId user's id
 * @param {string} password current password
 * @param {string} newPassword new password
 * @param {string} newPasswordRepeated new password confirmation
 * @returns Promise<>
 */

export default function updatePassword(userId: string, password: string, newPassword: string, newPasswordRepeated: string) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordRepeated)

    if (password === newPassword) throw new ContentError('New password must be different as previous password')

    if (newPassword !== newPasswordRepeated) throw new ContentError('Passwords do not match')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        if (user.password !== password) throw new AuthError('password is incorrect')

        return await User.updateOne({ _id: userId }, { $set: { password: newPassword } })
    })()
}