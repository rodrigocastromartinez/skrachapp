import { validateId } from "../../com"
import { User, Project, Track } from '../data/models'

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId projet id
 * @param {string} trackId track id
 * @returns {string[]} array of tracks left
 */

export default function deleteTrack (userId: string, projectId: string, trackId: string) {
    validateId(userId)
    validateId(projectId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = project.tracks.find((track: any) => track.id === trackId)

        if (!track) throw new Error(`track with id ${trackId} not found in this project`)

        const index = project.tracks.findIndex((track: any) => track.id === trackId);

        project.tracks.splice(index, 1)

        await project.save()

        return project.tracks
    })()
}