import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} projectId project id
 * @param {string} trackId track id
 * @param {number} volume track volume
 */

export default function updateVolume(projectId: string, trackId: string, volume: number) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}/volume`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ volume })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}