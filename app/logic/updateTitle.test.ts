import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import dotenv from 'dotenv'
import updateTitle from './updateTitle';

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        
        await updateTitle(user.id, project.id, 'PROJECT01')
        const _project = await Project.findById(project.id)

        console.log(_project)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()