import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import retrieveProject from './retrieveProject'

;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({ name: 'Untitled', owners: [user.id]})
        const _post = await retrieveProject(user.id, project.id)
        console.log(_post)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()