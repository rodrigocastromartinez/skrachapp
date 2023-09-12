import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import updatePassword from './updatePassword';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai';
import { describe } from 'mocha'

dotenv.config();

describe('updatePassword', () => {
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

  it('successfully updates user password', async () => {
    const newPassword = 'NewP@ssw0rd';

    await updatePassword(user.id.toString(), user.password, newPassword, newPassword);

    const updatedUser = await User.findById(user.id);

    expect(updatedUser).to.exist;
    expect(updatedUser.password).to.equal(newPassword);
  })

  it('fails when user does not exist', async () => {
    try {
      await updatePassword(userNotRegistered.id.toString(), userNotRegistered.password, 'NewP@ssw0rd', 'NewP@ssw0rd');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include(`user with id ${userNotRegistered.id.toString()} not found`);
    }
  })

  it('fails when current password is incorrect', async () => {
    try {
      await updatePassword(user.id.toString(), 'incorrect-password', 'NewP@ssw0rd', 'NewP@ssw0rd');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('password is incorrect');
    }
  })

  it('fails when new password and confirmation do not match', async () => {
    try {
      await updatePassword(user.id.toString(), user.password, 'NewP@ssw0rd', 'MismatchP@ss');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('Passwords do not match');
    }
  })

  it('fails when new password is the same as the current password', async () => {
    try {
      await updatePassword(user.id.toString(), user.password, user.password, user.password);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('New password must be different as previous password');
    }
  })

  it('fails when new password is too short', async () => {
    try {
      await updatePassword(user.id.toString(), user.password, 'Short1@', 'Short1@');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('password is shorter than 8 characters');
    }
  })

  it('fails when new password does not meet the format requirements', async () => {
    try {
      await updatePassword(user.id.toString(), user.password, 'WeakPassword', 'WeakPassword');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.include('password format is not valid');
    }
  })
})