import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import createProject from './createProject';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError, ExistenceError } from '../../com';

dotenv.config();

describe('createProject', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user

  beforeEach(async () => {
    await cleanUp()
    
    user = generate.user()

    await User.create(user)
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('succeeds in creating a project', async () => {
    const projectId = await createProject(user.id.toString())

    expect(projectId).to.exist

    // Verificar que el proyecto se haya creado correctamente
    const project = await Project.findById(projectId)
    expect(project).to.exist;
    expect(project.name).to.equal('Untitled')
    expect(project.owners).to.deep.equal([user.id])
  });

  it('fails when user does not exist', async () => {
    try {
      const _user = generate.user()
      await createProject(_user.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`user with id ${_user.id.toString()} not found`)
    }
  });

  it('fails when userId is empty', async () => {
    try {
      await createProject('')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`id is empty`)
    }
  });

  it('fails when userId is not a string', async () => {
    try {
      await createProject(null)
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('id is not a string - null')
    }
  })
})
