import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../data/models';
import authenticateUser from './authenticateUser';
import { cleanUp, generate } from './helpers';
import { expect } from 'chai'
import { describe } from 'mocha'
import { ContentError, ExistenceError, AuthError } from '../../com';

dotenv.config();

describe('authenticateUser', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST);
  });

  let user;

  beforeEach(async () => {
    await cleanUp()
    
    user = generate.user()

    await User.create(user)
  })

  after(async () => {
    await mongoose.disconnect();
  });

  it('succeeds on valid credentials', async () => {
    const userId = await authenticateUser(user.email, user.password);

    expect(userId).to.exist;
  });

  it('fails on non-existing user', async () => {
    try {
      await authenticateUser('nonexistent@example.com', 'password123');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('user not found');
    }
  });

  it('fails on wrong password', async () => {
    try {
      await authenticateUser(user.email, 'wrongpassword');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('wrong credentials');
    }
  });

  it('fails on empty email', async () => {
    try {
      await authenticateUser('', user.password);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Email is empty');
    }
  });

  it('fails on empty password', async () => {
    try {
      await authenticateUser(user.email, '');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('password is shorter than 8 characters');
    }
  });

  it('fails on non-string email', async () => {
    try {
      await authenticateUser(null, user.password);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Email is not a string');
    }
  });

  it('fails on non-string password', async () => {
    try {
      await authenticateUser(user.email, 12345);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('password format is not valid');
    }
  });

  it('fails on short password', async () => {
    try {
      await authenticateUser(user.email, 'short');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('password is shorter than 8 characters');
    }
  });
});
