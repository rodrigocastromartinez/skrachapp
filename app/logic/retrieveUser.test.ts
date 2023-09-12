import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import retrieveUser from './retrieveUser'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        await User.create({ name: 'rodrigo', email: 'ro@drigo.com', password: '123123123', savedPosts: [] })
        const user = await User.findOne({ email: 'ro@drigo.com' })
        const _user = await retrieveUser(user.id)
        console.log(_user)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()