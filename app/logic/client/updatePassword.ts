import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} password user current password
 * @param {string} newPassword user new password
 * @param {string} newPasswordRepeated user new password confirmation
 */

export default function updatePassword(password: string, newPassword: string, newPasswordRepeated: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/user/password`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordRepeated })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}