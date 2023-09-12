import { validateId } from '../../../com'
import context from './context'

/**
 * Retrieves a specific project
 * @param {string} projectId project id
 * @returns {object} the found project
 */

export default function retrieveProject(projectId: string) {
    validateId(projectId, 'project id')

    return (async () => {
        const res = await fetch(`http://localhost:3000/api/projects/${projectId}/retrieveproject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 200){
            const { message } = await res.json()

            throw new Error (message)
        }

        return await res.json()
    })()
}