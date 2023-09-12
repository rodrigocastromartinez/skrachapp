import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} description user description
 */

export default function updateDescription(description: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/users/description`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ description })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}