import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import retrieveUserEmail from './retrieveUserEmail';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'
import { ExistenceError } from '../../com';

dotenv.config();

describe('retrieveUserEmail', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user
  let userToFind
  let userNotRegistered

  beforeEach(async () => {
    await cleanUp()

    user = generate.user()
    userToFind = generate.user()
    userNotRegistered = generate.user()

    await User.create(user)
    await User.create(userToFind)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('successfully retrieves the email of the user', async () => {
    const retrievedEmail = await retrieveUserEmail(user.id.toString(), userToFind.id.toString());

    expect(retrievedEmail).to.exist;
    expect(retrievedEmail).to.equal(userToFind.email);
  })

  it('fails when requesting user does not exist', async () => {
    try {
      await retrieveUserEmail(userNotRegistered.id.toString(), userToFind.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when user to find does not exist', async () => {
    try {
      await retrieveUserEmail(user.id.toString(), userNotRegistered.id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })
})
