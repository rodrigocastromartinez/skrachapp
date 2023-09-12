import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import addMember from './addMember';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError } from '../../com';

dotenv.config();

describe('addMember', () => {
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

  it('successfully adds a member to the project', async () => {
    const result = await addMember(user.id.toString(), project.id.toString(), newUser.email);

    expect(result).to.exist;
    expect(result).to.be.an('array');
    expect(result).to.deep.include(newUser.id);

    const updatedProject = await Project.findById(project.id.toString());
    expect(updatedProject.owners).to.deep.include(newUser.id);

    const updatedUser = await User.findById(newUser.id);
    expect(updatedUser.projects).to.deep.include(project.id);
  })

  it('fails when user does not exist', async () => {
    try {
      await addMember(userNotRegistered.id.toString(), project.id.toString(), newUser.email);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when user email does not exist', async () => {
    try {
      await addMember(user.id.toString(), project.id.toString(), userNotRegistered.email);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with email ${userNotRegistered.email} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await addMember(user.id.toString(), projectNotRegistered.id.toString(), newUser.email);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`project with id ${projectNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when email format is invalid', async () => {
    try {
      await addMember(user.id.toString(), project.id.toString(), 'invalidemail');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Email format is not valid');
    }
  })

  it('fails when user with the same email is already a member', async () => {
    // Add the user as a member first
    await addMember(user.id.toString(), project.id.toString(), newUser.email);

    try {
      await addMember(user.id.toString(), project.id.toString(), newUser.email);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with email ${newUser.email} is already a member of the project`);
    }
  })

  it('fails when logged user is trying to add itself', async () => {
    try {
        await addMember(user.id.toString(), project.id.toString(), user.email)
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with email ${user.email} is already a member of the project`);
    }
  })
})
