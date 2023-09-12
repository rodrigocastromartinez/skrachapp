import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import retrieveUserEmail from './retrieveUserEmail'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        await User.create({ name: 'rodrigo', email: 'ro@drigo.com', password: '123123123' })
        const user = await User.findOne({ email: 'ro@drigo.com' })
        await User.create({ name: 'juan', email: 'juan@juan.com', password: '123123123' })
        const user2 = await User.findOne({ email: 'juan@juan.com' })
        const user2email = await retrieveUserEmail(user.id, user2.id)
        console.log(user2email)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()