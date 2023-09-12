import context from './context'

/**
 * Saves firebase url where the track is saved
 * @param {string} projectId project id
 * @param {string} email new member's email
 */

export default function addMember(projectId: string, email: string) {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/members`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ email })

        })

        if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

        return await res.json()
    })()
}