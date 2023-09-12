import { User, Project, Track } from '../../data'

export default async function cleanUp() {
  await Promise.all([
    User.deleteMany(),
    Project.deleteMany(),
    Track.deleteMany()
  ])
}