import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import retrieveProject from './retrieveProject';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ExistenceError } from '../../com';

dotenv.config();

describe('retrieveProject', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let project
  let userNotRegistered
  let projectNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    project = generate.project()
    userNotRegistered = generate.user()
    projectNotRegistered = generate.project()

    await User.create(user)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully retrieves a project', async () => {
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

    const project1 = await Project.findOne({ name: projectNotRegistered.name })

    const retrievedProject = await retrieveProject(user1.id.toString(), project1.id.toString())

    expect(retrievedProject).to.exist
    expect(retrievedProject.name).to.equal(projectNotRegistered.name)
    expect(retrievedProject.owners.map(owner => owner.toString())).to.include(user1.id)
  })

  it('fails when user does not exist', async () => {
    try {
      await retrieveProject(userNotRegistered.id.toString(), project.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await retrieveProject(user.id.toString(), projectNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })
})
