import { validateId } from "../../com"
import { User, Project, Track } from '../data/models'
import { firebase } from '../firebase'

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

export default function saveAudio (userId: string, projectId: string, trackId: string, file: Buffer) {
    validateId(userId)
    validateId(projectId)
    validateId(trackId)
    
    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new Error(`user with id ${userId} not found`)

        const project = await Project.findById(projectId)
        
        if (!project) throw new Error(`project with id ${projectId} not found`)

        const track = project.tracks.find((track: any) => track.id === trackId)
        
        if (!track) throw new Error(`track with id ${trackId} not found`)

        const { ref } = await firebase.storage().ref().child(`${projectId}/${trackId}.ogg`).put(file)

        const url = await ref.getDownloadURL()

        return url
    })()
}