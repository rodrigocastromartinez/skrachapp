import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Project } from '../data/models';
import createTrack from './createTrack'
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ContentError, ExistenceError } from '../../com';

dotenv.config();

describe('createTrack', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let _user
  let project
  let _project

  beforeEach(async () => {
    await cleanUp()
    
    user = generate.user()
    _user = generate.user()
    project = generate.project()
    _project = generate.project()
    project.owners = [user.id]

    await User.create(user)
    await Project.create(project)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds in creating a track', async () => {
    const track = await createTrack(user.id.toString(), project.id.toString())

    expect(track).to.exist

    const _project = await Project.findById(project.id.toString())
    const _track = _project.tracks[0]

    expect(_track).to.exist
    expect(_track.id.toString()).to.equal(track.id.toString())
  })

  it('fails when user does not exist', async () => {
    try {
      
      await createTrack(_user.id.toString(), project.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${_user.id.toString()} not found`)
    }
  })

  it('fails when project does not exist', async () => {
    try {
      
      await createTrack(user.id.toString(), _project.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`project with id ${_project.id.toString()} not found`)
    }
  })

  it('fails when userId is empty', async () => {
    try {
      await createTrack('', project.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`id is empty`)
    }
  })

  it('fails when userId is not a string', async () => {
    try {
      await createTrack(null, project.id.toString())
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError)
      expect(error.message).to.equal('id is not a string - null')
    }
  })
})
