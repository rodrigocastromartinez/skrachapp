import context from './context'

/**
 * Saves firebase url where the track is saved
 * @param {string} projectId project id
 * @param {string} trackId track id
 */

export default function deleteTrack(projectId: string, trackId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}