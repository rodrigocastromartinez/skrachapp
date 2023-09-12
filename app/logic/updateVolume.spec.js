import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project, Track } from '../data/models';
import updateVolume from './updateVolume';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha';

dotenv.config();

describe('updateVolume', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user;
  let project;
  let track;
  let userNotRegistered;
  let projectNotRegistered;
  let trackNotInProject;

  beforeEach(async () => {
    await cleanUp();

    user = generate.user();
    userNotRegistered = generate.user();
    project = generate.project();
    projectNotRegistered = generate.project();
    track = generate.track();
    trackNotInProject = generate.track();

    await User.create(user);
    await Project.create(project);
  });

  after(async () => {
    await mongoose.disconnect()
  });

  it('successfully updates track volume', async () => {
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
    const newVolume = 0.5;

    await updateVolume(userNotRegistered.id.toString(), projectNotRegistered.id.toString(), track.id.toString(), newVolume);

    const updatedProject = await Project.findById(projectNotRegistered.id);
    expect(updatedProject).to.exist;
    const updatedTrack = updatedProject.tracks.find(t => t.id.toString() === track.id.toString());
    expect(updatedTrack.volume).to.equal(newVolume);
  });

  it('fails when user does not exist', async () => {
    try {
      await updateVolume(userNotRegistered.id.toString(), project.id.toString(), track.id.toString(), 0.5);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  });

  it('fails when project does not exist', async () => {
    try {
      await updateVolume(user.id.toString(), projectNotRegistered.id.toString(), track.id.toString(), 0.5);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  });

  it('fails when track does not exist in the project', async () => {
    try {
      await updateVolume(user.id.toString(), project.id.toString(), trackNotInProject.id.toString(), 0.5);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`track with id ${trackNotInProject.id.toString()} not found in this project`);
    }
  });

  it('fails when volume is not a valid number', async () => {
    try {
      await updateVolume(user.id.toString(), project.id.toString(), track.id.toString(), 'invalid-volume'); // Invalid volume
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('number is not a type of number');
    }
  });
});
