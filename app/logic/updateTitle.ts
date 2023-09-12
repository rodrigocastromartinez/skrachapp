import { validateId, validateText } from "../../com"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} title project title
 * @returns {Promise<>} 
 */

export default function updateTitle (userId: string, projectId: string, title: string) {
    validateId(userId)
    validateId(projectId)
    validateText(title)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        project.name = title

        await project.save()
    })()
}