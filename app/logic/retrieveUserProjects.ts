import { validateId, ExistenceError } from '../../com'
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @returns {Promise<object>} all posts
 */

export default function retrieveUserProjects(userId: string) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const projects = await Promise.all(user.projects.map((project: typeof Project) => Project.findById(project)))

        return projects
    })()
}