import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import retrieveUserProjects from './retrieveUserProjects';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ExistenceError } from '../../com';

dotenv.config();

describe('retrieveUserProjects', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let userNotRegistered
  let project
  let projectNotOwned
  let projectNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    userNotRegistered = generate.user()
    project = generate.project()
    projectNotOwned = generate.project()
    projectNotRegistered = generate.project()

    await User.create(user)
    await Project.create(project)
    await Project.create(projectNotOwned)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully retrieves user projects', async () => {
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

    const retrievedProjects = await retrieveUserProjects(user1.id.toString());

    expect(retrievedProjects).to.exist;
    expect(retrievedProjects).to.be.an('array');
    expect(retrievedProjects.length).to.equal(1);
    expect(retrievedProjects[0].id).to.equal(project.id);
  })

  it('fails when user does not exist', async () => {
    try {
      await retrieveUserProjects(userNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`User with id ${userNotRegistered.id.toString()} not found`)
    }
  })

  it('successfully retrieves no projects when user has none', async () => {
    await User.create({
        id: userNotRegistered.id,
        name: `${userNotRegistered.name}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        projects: [],
        description: `description-${Math.random()}`,
    })

    const user1 = await User.findById(userNotRegistered.id)

    const retrievedProjects = await retrieveUserProjects(user1.id.toString());

    expect(retrievedProjects).to.exist;
    expect(retrievedProjects).to.be.an('array');
    expect(retrievedProjects.length).to.equal(0);
  })

  it('successfully retrieves no projects when user has no ownership', async () => {
    await User.create({
        id: userNotRegistered.id,
        name: `${userNotRegistered.name}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        projects: [],
        description: `description-${Math.random()}`,
    })

    const user1 = await User.findById(userNotRegistered.id)

    await Project.create({
        id: projectNotRegistered.id,
        name: `${projectNotRegistered.name}`,
        date: new Date(),
        owners: [user.id],
        privacy: `privacy-${Math.random()}`,
        tracks: [],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
    })

    const retrievedProjects = await retrieveUserProjects(user1.id.toString());

    expect(retrievedProjects).to.exist;
    expect(retrievedProjects).to.be.an('array');
    expect(retrievedProjects.length).to.equal(0);
  })
})
