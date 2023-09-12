import { validateEmail, validateId } from "../../com"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} email new email to add
 * @returns {Promise<>} 
 */

export default function addMember (userId: string, projectId: string, email: string) {
    validateId(userId)
    validateId(projectId)
    validateEmail(email)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        if (user.email === email) throw new Error(`user with email ${email} is already a member of the project`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)
        
        const newUser = await User.findOne({ email })

        if (!newUser) throw new Error(`user with email ${email} not found`)

        if(project.owners.includes(newUser.id)) throw new Error(`user with email ${email} is already a member of the project`)
        
        project.owners.push(newUser.id)

        newUser.projects.push(project.id)

        await Promise.all([project.save(), newUser.save()])

        return project.owners
    })()
}