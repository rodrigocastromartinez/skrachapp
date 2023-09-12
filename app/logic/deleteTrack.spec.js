import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project, Track } from '../data/models';
import deleteTrack from './deleteTrack';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError } from '../../com';

dotenv.config();

describe('deleteTrack', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let project
  let newUser
  let userNotRegistered
  let projectNotRegistered
  let trackToDelete
  let trackNotInProject

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    project = generate.project()
    newUser = generate.user()
    userNotRegistered = generate.user()
    projectNotRegistered = generate.project()
    trackToDelete = generate.track()
    trackNotInProject = generate.track()

    await User.create(user)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully deletes a track from the project', async () => {
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

    await Project.create({
        id: projectNotRegistered.id,
        name: `${projectNotRegistered.name}`,
        date: new Date(),
        owners: [user1.id],
        privacy: `privacy-${Math.random()}`,
        tracks: [trackToDelete],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
    })

    const project1 = await Project.findOne({name: projectNotRegistered.name})

    await deleteTrack(user1.id.toString(), project1.id.toString(), trackToDelete.id.toString());

    const updatedProject = await Project.findById(project.id.toString());

    expect(updatedProject).to.exist;
    expect(updatedProject.tracks.length).to.equal(0);
    expect(updatedProject.tracks.map((track) => track.id)).to.not.include(trackToDelete.id);
  })

  it('fails when user does not exist', async () => {
    try {
      await deleteTrack(userNotRegistered.id.toString(), project.id.toString(), trackToDelete.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await deleteTrack(user.id.toString(), projectNotRegistered.id.toString(), trackToDelete.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when track does not exist in the project', async () => {
    try {
      await deleteTrack(user.id.toString(), project.id.toString(), trackNotInProject.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`track with id ${trackNotInProject.id} not found in this project`);
    }
  })
})