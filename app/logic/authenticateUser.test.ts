import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import authenticateUser from './authenticateUser'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        await User.create({ name: 'rodrigo', email: 'ro@drigo.com', password: '123123123', savedPosts: [] })
        const token = await authenticateUser('ro@drigo.com', '123123123')
        console.log(token)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()