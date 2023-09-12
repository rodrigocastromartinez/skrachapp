import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import updateDescription from './updateDescription';
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updateDescription(user.id, 'this is my description')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.description)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()