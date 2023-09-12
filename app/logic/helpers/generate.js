import { Types } from "mongoose"
const { ObjectId } = Types

const generate = {
    track: () => ({
      id: new ObjectId(),
      project: new ObjectId(),
      date: new Date(),
      audio: `audio-${Math.random()}`,
      volume: Math.random(),
      delay: Math.random(),
      instrument: `instrument-${Math.random()}`,
    }),

    project: () => ({
      id: new ObjectId(),
      name: `name-${Math.random()}`,
      date: new Date(),
      owners: [],
      privacy: `privacy-${Math.random()}`,
      tracks: [],
      image: `image-${Math.random()}`,
      key: `key-${Math.random()}`,
    }),

    user: () => ({
      id: new ObjectId(),
      name: `name-${Math.random()}`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`,
      avatar: `avatar-${Math.random()}`,
      projects: [],
      description: `description-${Math.random()}`,
    }),
  }
  
  export default generate