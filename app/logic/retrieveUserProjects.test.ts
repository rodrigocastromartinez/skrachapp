import mongoose from 'mongoose'
import { User, Project } from '../data/models'
import retrieveUserProjects from './retrieveUserProjects';

;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_TEST!)
        await Promise.all([User.deleteMany(), Project.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project1 = await Project.create({ name: 'Untitled1', owners: [user.id]})
        user.projects.push(project1)
        const project2 = await Project.create({ name: 'Untitled2', owners: [user.id]})
        user.projects.push(project2)
        await user.save()
        const projects = await retrieveUserProjects(user.id)
        console.log(projects)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()