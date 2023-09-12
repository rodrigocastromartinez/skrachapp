import { validateId } from "../../com"
import { User, Project, Track } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

export default function createTrack (userId: string, projectId: string) {
    validateId(userId)
    validateId(projectId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = new Track({project: projectId, volume: 70, delay: 0, audio:''})

        project.tracks.push(track)

        await project.save()

        return track
    })()
}