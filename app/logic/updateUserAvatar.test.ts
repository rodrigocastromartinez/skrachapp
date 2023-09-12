import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import updateUserAvatar from './updateUserAvatar'
import dotenv from 'dotenv'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' })
        await updateUserAvatar(user.id, 'http://www.new-image/new-avatar.jpg')
        const updatedUser = await User.findById(user.id)
        console.log(updatedUser.avatar)
    } catch(error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()