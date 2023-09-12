import { validateId, validateNumber } from "../../com"
import { User, Project } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} trackId track id
 * @param {number} volume track volume
 * @returns {Promise<>} 
 */

export default function updateVolume (userId: string, projectId: string, trackId: string, volume: number) {
    validateId(userId)
    validateId(projectId)
    validateId(trackId)
    validateNumber(volume)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = project.tracks.find((track: any) => track.id === trackId)

        if (!track) throw new Error(`track with id ${trackId} not found in this project`)

        track.volume = volume

        await project.save()
    })()
}