import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import updateTitle from './updateTitle';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha';

dotenv.config();

describe('updateTitle', () => {
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
    userNotRegistered = generate.user()
    project = generate.project()
    projectNotRegistered = generate.project()

    await User.create(user)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully updates project title', async () => {
    const newTitle = 'New Project Title';

    await updateTitle(user.id.toString(), project.id.toString(), newTitle);

    const updatedProject = await Project.findById(project.id);

    expect(updatedProject).to.exist;
    expect(updatedProject.name).to.equal(newTitle);
  })

  it('fails when user does not exist', async () => {
    try {
      await updateTitle(userNotRegistered.id.toString(), project.id.toString(), 'New Title');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when project does not exist', async () => {
    try {
      await updateTitle(user.id.toString(), projectNotRegistered.id.toString(), 'New Title');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`project with id ${projectNotRegistered.id} not found`);
    }
  })

  it('fails when title is not a valid text', async () => {
    try {
      await updateTitle(user.id.toString(), project.id.toString(), 12345); // Invalid title
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('text is not a string');
    }
  })
})
