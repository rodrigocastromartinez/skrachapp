import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import dotenv from 'dotenv'
import deleteProject from './deleteProject'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        user.projects.push(project.id)
        await user.save()
        console.log(user.projects)
        await deleteProject(user.id, project.id)
        const _user = await User.findById(user.id)
        const _project = await Project.findById(project.id)
        console.log(_project)
        console.log(_user.projects)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()