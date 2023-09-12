import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import updatePassword from './updatePassword'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updatePassword(user.id, user.password, '234234234', '234234234')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.password)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()