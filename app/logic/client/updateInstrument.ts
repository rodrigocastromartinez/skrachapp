import context from './context'

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} projectId project id
 * @param {string} trackId track id
 * @param {string} instrument user instrument
 */

export default function updateInstrument(projectId: string, trackId: string, instrument: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}/instrument`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ instrument })
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}