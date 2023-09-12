import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} avatar user avatar
 */

export default function updateUserAvatar(avatar: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/avatar`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}