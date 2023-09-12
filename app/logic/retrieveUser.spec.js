import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import retrieveUser from './retrieveUser';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ExistenceError } from '../../com';

dotenv.config();

describe('retrieveUser', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let userNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    userNotRegistered = generate.user()

    await User.create(user)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully retrieves a user', async () => {
    const retrievedUser = await retrieveUser(user.id.toString());

    expect(retrievedUser).to.exist;
    expect(retrievedUser.name).to.equal(user.name);
    expect(retrievedUser.email).to.equal(user.email);
    expect(retrievedUser.avatar).to.equal(user.avatar);
    expect(retrievedUser.description).to.equal(user.description);
    expect(retrievedUser.projects).to.deep.equal(user.projects.map(project => project.toString()));
  })

  it('fails when user does not exist', async () => {
    try {
      await retrieveUser(userNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('user not found');
    }
  })
})
