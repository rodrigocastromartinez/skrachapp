import context from './context'

/**
 * Saves firebase url where the track is saved
 * @param {string} projectId project id to delete
 */

export default function deleteProject(projectId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}`, 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return await res.json()
    })()
}