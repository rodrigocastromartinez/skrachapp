import context from './context'

/**
 * Saves firebase url where the track is saved
 * @param {string} projectId project id
 * @param {string} trackId track id
 * @param {string} url track url
 */

export default function saveUrl(projectId: string, trackId: string, url: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tracks/${trackId}/url`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ url })

        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
    })()
}