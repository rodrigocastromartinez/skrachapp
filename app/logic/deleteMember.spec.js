import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import deleteMember from './deleteMember';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError } from '../../com';

dotenv.config();

describe('deleteMember', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let project
  let newUser
  let userNotRegistered
  let projectNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    project = generate.project()
    newUser = generate.user()
    userNotRegistered = generate.user()
    projectNotRegistered = generate.project()

    await User.create(user)
    await User.create(newUser)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully deletes a member from the project', async () => {
    await Project.create({
        id: projectNotRegistered.id,
        name: `${projectNotRegistered.name}`,
        date: new Date(),
        owners: [user.id, newUser.id],
        privacy: `privacy-${Math.random()}`,
        tracks: [],
        image: `image-${Math.random()}`,
        key: `key-${Math.random()}`,
    })

    const project = await Project.findOne({name: projectNotRegistered.name})

    const projectOwners = await deleteMember(user.id.toString(), project.id.toString(), newUser.id.toString());

    expect(projectOwners).to.exist;
    expect(projectOwners).to.be.an('array');
    expect(projectOwners).to.not.include(newUser.id)
    expect(projectOwners).to.include(user.id)

    const updatedProject = await Project.findById(project.id.toString());
    expect(updatedProject.owners).to.not.include(newUser.id)
    expect(updatedProject.owners).to.include(user.id)

    const updatedUser = await User.findById(newUser.id);
    expect(updatedUser.projects).to.not.include(project.id);
  })

  it('fails when user does not exist', async () => {
    try {
      await deleteMember(userNotRegistered.id.toString(), project.id.toString(), newUser.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when new user does not exist', async () => {
    try {
      await deleteMember(user.id.toString(), project.id.toString(), userNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await deleteMember(user.id.toString(), projectNotRegistered.id.toString(), newUser.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when newUserId is not a project member', async () => {
    try {
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
    
        const project = await Project.findOne({name: projectNotRegistered.name})
    
        await deleteMember(user.id.toString(), project.id.toString(), newUser.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`user with id ${newUser.id.toString()} is not a project member`)
    }
  })

  it('fails when newUserId is the logged user', async () => {
    try {
      await deleteMember(user.id.toString(), project.id.toString(), user.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`id ${user.id} corresponds to logged user`)
    }
  })
})