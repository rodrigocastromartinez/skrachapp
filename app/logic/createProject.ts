import { validateId } from "../../com"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

export default function createProject (userId: string) {
    validateId(userId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)
        
        const projectId = await Project.create({
            name: 'Untitled',
            owners:[userId]
        })

        user.projects.push(projectId)

        await user.save()

        return projectId
    })()
}