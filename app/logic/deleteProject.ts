import { validateId } from "../../com"
import { UserModel } from "../data/interfaces"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} email email to delete
 * @returns {Promise<>} NOT TRUE, MUST BE CORRECTED
 */

export default function deleteProject (userId: string, projectId: string) {
    validateId(userId)
    validateId(projectId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        if (!project.owners.includes(userId)) throw new Error(`user with id ${userId} not an owner`)

        project.owners.forEach(async (owner: string) => {            
            const user = await  User.findById(owner)

            const index = user.projects.indexOf(projectId)

            user.projects.splice(index, 1)

            await user.save()
        })

        await Project.findByIdAndDelete(projectId)

        return 
    })()
}