import { validateId } from "../../com"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} email email to delete
 * @returns {[]} array of objetc ids
 */

export default function deleteMember (userId: string, projectId: string, newUserId: string) {
    validateId(userId)
    validateId(projectId)
    validateId(newUserId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        if (userId === newUserId) throw new Error(`id ${newUserId} corresponds to logged user`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const _user = await User.findById(newUserId)
        
        if (!_user) throw new Error(`user with id ${newUserId} not found`)
        
        if(!project.owners.includes(newUserId)) throw new Error(`user with id ${newUserId} is not a project member`)
        
        const index = project.owners.indexOf(newUserId)

        project.owners.splice(index, 1)

        const _index = _user.projects.indexOf(projectId)

        _user.projects.splice(_index, 1)

        await Promise.all([project.save(), _user.save()])

        return project.owners
    })()
}