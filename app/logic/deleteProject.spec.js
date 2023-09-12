import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import deleteProject from './deleteProject';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError } from '../../com';

dotenv.config();

describe('deleteProject', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let project
  let newUser
  let userNotRegistered
  let userNotRegistered2
  let projectNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    project = generate.project()
    newUser = generate.user()
    userNotRegistered = generate.user()
    userNotRegistered2 = generate.user()
    projectNotRegistered = generate.project()

    await User.create(user)
    await User.create(newUser)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully deletes a project and updates user projects', async () => {
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
        tracks: [],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
    })

    const project = await Project.findOne({name: projectNotRegistered.name})

    await deleteProject(user1.id.toString(), project.id.toString());

    const updatedUser = await User.findById(user.id.toString());
    const updatedProject = await Project.findById(project.id.toString());

    expect(updatedUser).to.exist;
    expect(updatedProject).to.not.exist;

    expect(updatedUser.projects.length).to.equal(0);
    expect(updatedUser.projects).to.not.include(project.id);
  })

  it('fails when user does not exist', async () => {
    try {
      await deleteProject(userNotRegistered.id.toString(), project.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await deleteProject(user.id.toString(), projectNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not belong to user', async () => {
    try {
      await deleteProject(user.id.toString(), project.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${user.id.toString()} not an owner`);
    }
  })
})