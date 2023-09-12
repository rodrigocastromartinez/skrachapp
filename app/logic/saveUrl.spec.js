import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project, Track } from '../data/models';
import saveUrl from './saveUrl';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'

dotenv.config();

describe('saveUrl', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let project
  let track
  let track2
  let userNotRegistered
  let projectNotOwned
  let projectNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    userNotRegistered = generate.user()
    project = generate.project()
    projectNotOwned = generate.project()
    track = generate.track()
    track2 = generate.track()
    projectNotRegistered = generate.project()

    await User.create(user)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully saves track URL', async () => {
    await User.create({
      id: userNotRegistered.id,
      name: `${userNotRegistered.name}`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`,
      avatar: `avatar-${Math.random()}`,
      projects: [projectNotRegistered.id],
      description: `description-${Math.random()}`,
    })

    const user1 = await User.findById(userNotRegistered.id)

    await Track.create({
      id: track.id,
      project: projectNotRegistered.id,
      date: new Date(),
      audio: `audio-${Math.random()}`,
      volume: Math.random(),
      delay: Math.random(),
      instrument: `instrument-${Math.random()}`,
    })

    const track1 = await Track.findById(track.id)

    await Project.create({
      id: projectNotRegistered.id,
      name: `${projectNotRegistered.name}`,
      date: new Date(),
      owners: [user1.id],
      privacy: `privacy-${Math.random()}`,
      tracks: [track1],
      image: `image-${Math.random()}`,
      key: `key-${Math.random()}`,
    })

    const project1 = await Project.findOne({ name: projectNotRegistered.name })

    const newUrl = `https://new-audio-url.com`;
    await saveUrl(user1.id.toString(), projectNotRegistered.id.toString(), track.id.toString(), newUrl);

    const updatedProject = await Project.findById(projectNotRegistered.id);

    expect(updatedProject).to.exist;
    expect(updatedProject.tracks[0].audio).to.equal(newUrl);
  })

  it('fails when user does not exist', async () => {
    try {
      await saveUrl(userNotRegistered.id.toString(), project.id.toString(), track.id.toString(), 'https://new-audio-url.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await saveUrl(user.id.toString(), projectNotRegistered.id.toString(), track.id.toString(), 'https://new-audio-url.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when track does not exist in the project', async () => {
    try {
      await User.create({
        id: userNotRegistered.id,
        name: `${userNotRegistered.name}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        projects: [projectNotRegistered.id],
        description: `description-${Math.random()}`,
      })

      const user1 = await User.findById(userNotRegistered.id)

      await Track.create({
        id: track2.id,
        project: projectNotRegistered.id,
        date: new Date(),
        audio: `audio-${Math.random()}`,
        volume: Math.random(),
        delay: Math.random(),
        instrument: `instrument-${Math.random()}`,
      })

      await Project.create({
        id: projectNotRegistered.id,
        name: `${projectNotRegistered.name}`,
        date: new Date(),
        owners: [user1.id],
        privacy: `privacy-${Math.random()}`,
        tracks: [],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
      })

      await saveUrl(user1.id.toString(), projectNotRegistered.id.toString(), track2.id.toString(), 'https://new-audio-url.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`track with id ${track2.id.toString()} not found in this project`);
    }
  })

  it('fails when URL is not a valid text', async () => {
    try {
      await User.create({
        id: userNotRegistered.id,
        name: `${userNotRegistered.name}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        projects: [projectNotRegistered.id],
        description: `description-${Math.random()}`,
      })

      const user1 = await User.findById(userNotRegistered.id)

      await Track.create({
        id: track.id,
        project: projectNotRegistered.id,
        date: new Date(),
        audio: `audio-${Math.random()}`,
        volume: Math.random(),
        delay: Math.random(),
        instrument: `instrument-${Math.random()}`,
      })

      const track1 = await Track.findById(track.id)

      await Project.create({
        id: projectNotRegistered.id,
        name: `${projectNotRegistered.name}`,
        date: new Date(),
        owners: [user1.id],
        privacy: `privacy-${Math.random()}`,
        tracks: [track1],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
      })

      await saveUrl(user1.id.toString(), projectNotRegistered.id.toString(), track.id.toString(), 12345); // Invalid URL
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`text is not a string`);
    }
  })
})
