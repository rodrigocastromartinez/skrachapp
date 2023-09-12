import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import dotenv from 'dotenv'
import deleteMember from './deleteMember'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const user2 = await User.create({ name: 'wendy.darling', email: 'wendy@darling.com', password: '123123123'})
        const project = await Project.create({name: 'example', owners: [user.id, user2.id]})
        console.log(project.owners)
        await deleteMember(user.id, project.id, user2.id)
        const _project = await Project.findById(project.id)
        console.log(_project.owners)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()