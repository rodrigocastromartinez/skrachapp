import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import createProject from './createProject'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user1 = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const user2 = await User.create({ name: 'pepe.grillo2', email: 'pepe2@grillo.com', password: '123123123' })
        await createProject(user1.id)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()