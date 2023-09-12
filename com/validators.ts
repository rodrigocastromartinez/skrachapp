console.debug('validators loaded')
import { ContentError } from './errors'

function validateEmail(email : string) {
    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (!email.trim().length) throw new ContentError('Email is empty')
    if (!emailExpression.test(email)) throw new ContentError('Email format is not valid')
}

function validateUrl(avatarUrl : string, explain : string = 'url') {
    if (typeof avatarUrl !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!avatarUrl.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateId(id : string, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string - ${id}`)
    if (!id.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateUserName(userName : string) {
    if (userName === undefined || userName === null) throw new ContentError('Username is not valid')
    if (userName.trim().length < 1) throw new ContentError('Name is empty')
    if (!userNameExpression.test(userName)) throw new ContentError('Username is not valid')
}

function validatePassword(userPassword : string, message = 'password') {
    if (userPassword.length < 8) throw new RangeError(`${message} is shorter than 8 characters`)
    if (!passwordExpression.test(userPassword)) throw new ContentError(`${message} format is not valid`)
}

function validateText(postText : string, explain = 'text') {
    if (typeof postText !== 'string') throw new TypeError(`${explain} is not a string`)
    if (postText.trim().length < 1) throw new ContentError('Text is empty')
}

function validateToken(token : string, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

function validateNumber(number : number, explain = 'number') {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not a type of number`)
}

const userNameExpression = /^[a-z0-9._-]{3,30}$/
const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^[a-zA-Z\d#$@!%&*?]{8,32}/
// const tokenExpression = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
// const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/

export { validateEmail, validateUrl, validateId, validateUserName, validatePassword, validateText, validateToken, validateNumber }