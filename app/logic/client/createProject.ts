import context from './context'

/**
 * Creates a new project
 */

export default function createProject() {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects`, {
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