import { validateId, validateText } from "../../com"
import { User, Project, Track } from '../data/models'
import { TrackModel } from "../data/interfaces"

/**
 * 
 * @param {string} userId user's id
 * @param {string} projectId project id
 * @param {string} trackId track id
 * @param {string} url track url
 * @returns {Promise<>} 
 */

export default function saveUrl (userId: string, projectId: string, trackId: string, url: string) {
    validateId(userId)
    validateId(projectId)
    validateId(trackId)
    validateText(url)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = project.tracks.find((track: TrackModel) => track.id === trackId)

        if(!track) throw new Error(`track with id ${trackId} not found in this project`)

        track.audio = url

        await project.save()
    })()
}