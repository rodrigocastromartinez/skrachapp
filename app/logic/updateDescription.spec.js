import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import updateDescription from './updateDescription';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'

dotenv.config();

describe('updateDescription', () => {
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

  it('successfully updates user description', async () => {
    const newDescription = `New user description for testing`;

    await updateDescription(user.id.toString(), newDescription);

    const updatedUser = await User.findById(user.id);

    expect(updatedUser).to.exist;
    expect(updatedUser.description).to.equal(newDescription);
  })

  it('fails when user does not exist', async () => {
    try {
      await updateDescription(userNotRegistered.id.toString(), `New user description`);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when description is not a valid text', async () => {
    try {
      await updateDescription(user.id.toString(), 12345); // Invalid description
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`text is not a string`);
    }
  })
})
