import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../data/models'
import registerUser from './registerUser'
import { cleanUp, generate } from './helpers'
import { expect } from 'chai'

dotenv.config()

interface UserModel {    
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    projects: (string | undefined)[];
    description: string;
}

describe('registerUser', () => {
  before(async () => {
    await mongoose.connect(
        `${process.env.MONGODB_URL_TEST}`
      )
  })

  let user: UserModel

  beforeEach(async () => {
    user = generate.user()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on new user', async () => {
    await registerUser(user.name, user.email, user.password)

    const userRegistered = await User.findOne({ email: user.email })

    expect(userRegistered).to.exist
    expect(userRegistered.name).to.equal(user.name)
    expect(userRegistered.email).to.equal(user.email)
    expect(userRegistered.password).to.equal(user.password)
    expect(userRegistered.avatar).to.equal(undefined)
    expect(userRegistered.projects).to.equal([])
  })

  it('fails on existing user', async () => {
    await registerUser(user.name, user.email, user.password)

    try {
      await registerUser(user.name, user.email, user.password)
    } catch (error: any) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        `user with email ${user.email} already exists`
      )
    }
  })

  // Some validators tests:

  it('fails on empty name', () =>
    expect(() =>
      registerUser('', user.email, user.password)
    ).to.throw(Error, 'Name is empty'))

  it('fails on empty email', () =>
    expect(() =>
      registerUser(user.name, '', user.password)
    ).to.throw(Error, 'Email is empty'))

  it('fails on non-string name (or does not satisfies regEx)', () => {
    expect(() =>
    // @ts-ignore
      registerUser(undefined, user.email, user.password)
    ).to.throw(Error, 'Username is not valid')

    expect(() =>
      registerUser(`@-${Math.random()}`, user.email, user.password)
    ).to.throw(Error, 'Username is not valid')

    expect(() =>
    // @ts-ignore
      registerUser(null, user.email, user.password)
    ).to.throw(Error, 'Name is not a string')

    expect(() =>
    // @ts-ignore
      registerUser({}, user.email, user.password)
    ).to.throw(Error, 'Name is not a string')

    expect(() =>
    // @ts-ignore
      registerUser([], user.email, user.password)
    ).to.throw(Error, 'Name is not a string')
  })

  it('fails on non-string email', () => {
    expect(() =>
    // @ts-ignore
      registerUser(user.name, undefined, user.password)
    ).to.throw(Error, 'Email is not a string')
  })
})