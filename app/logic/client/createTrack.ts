import context from './context'

/**
 * Creates a new track for a specific project
 * @param {string} projectId project id
 * @returns {string} track id
 */

export default function createTrack(projectId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}