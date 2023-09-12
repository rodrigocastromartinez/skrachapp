import context from './context'

/**
 * Saves firebase url where the track is saved
 * @param {string} projectId project id
 * @param {string} email member's email to delete
 */

export default function deleteMember(projectId: string, userId: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/members/${userId}`, 
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