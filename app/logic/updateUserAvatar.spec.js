import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import updateUserAvatar from './updateUserAvatar';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha';

dotenv.config();

describe('updateUserAvatar', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST)
  });

  let user;
  let userNotRegistered;

  beforeEach(async () => {
    await cleanUp();

    user = generate.user();
    userNotRegistered = generate.user();

    await User.create(user);
  });

  after(async () => {
    await mongoose.disconnect()
  });

  it('successfully updates user avatar', async () => {
    const newAvatarUrl = 'https://new-avatar-url.com';

    await updateUserAvatar(user.id.toString(), newAvatarUrl);

    const updatedUser = await User.findById(user.id);

    expect(updatedUser).to.exist;
    expect(updatedUser.avatar).to.equal(newAvatarUrl);
  });

  it('fails when user does not exist', async () => {
    try {
      await updateUserAvatar(userNotRegistered.id.toString(), 'https://new-avatar-url.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  });

  it('fails when avatar URL is not valid', async () => {
    try {
      await updateUserAvatar(user.id.toString(), 'invalid-url'); // Invalid URL
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('URL format is not valid');
    }
  });
});
