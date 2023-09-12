import context from './context'

/**
 * Retrieves all the projects that belong to the logged user
 * @returns {array} an array of objects with all the projects found
 */

export default function retrieveUserProjects() {
    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/retrieveall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200) {
            const { message } = await res.json()

            throw new Error(message)
        }

        return await res.json()
    })()
}