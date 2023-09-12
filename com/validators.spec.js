import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  validateEmail,
  validateUrl,
  validateId,
  validateUserName,
  validatePassword,
  validateText,
  validateToken,
  validateNumber,
} from './validators';

describe('Validators', () => {
  it('should validate email', () => {
    // Validar un correo electrónico válido
    const validEmail = 'test@example.com';

    // Validar un correo electrónico vacío
    const emptyEmail = '';

    // Validar un correo electrónico con formato incorrecto
    const invalidEmail = 'invalid_email';

    // La función debería pasar sin lanzar errores para el correo electrónico válido
    expect(() => validateEmail(validEmail)).to.not.throw();

    // La función debería lanzar un error ContentError para el correo electrónico vacío
    expect(() => validateEmail(emptyEmail)).to.throw('Email is empty');

    // La función debería lanzar un error ContentError para el correo electrónico con formato incorrecto
    expect(() => validateEmail(invalidEmail)).to.throw('Email format is not valid');
  });

  it('should validate URL', () => {
    // Validar una URL válida
    const validUrl = 'https://example.com';

    // Validar una URL vacía
    const emptyUrl = '';

    // La función debería pasar sin lanzar errores para la URL válida
    expect(() => validateUrl(validUrl)).to.not.throw();

    // La función debería lanzar un error ContentError para la URL vacía
    expect(() => validateUrl(emptyUrl)).to.throw('url is empty');
  });

  it('should validate ID', () => {
    // Validar un ID válido
    const validId = '12345';

    // Validar un ID vacío
    const emptyId = '';

    // La función debería pasar sin lanzar errores para el ID válido
    expect(() => validateId(validId)).to.not.throw();

    // La función debería lanzar un error ContentError para el ID vacío
    expect(() => validateId(emptyId)).to.throw('id is empty');
  });

  it('should validate username', () => {
    // Validar un nombre de usuario válido
    const validUserName = 'user_123';

    // Validar un nombre de usuario vacío
    const emptyUserName = '';

    // Validar un nombre de usuario que no cumple con la expresión regular
    const invalidUserName = 'user name';

    // La función debería pasar sin lanzar errores para el nombre de usuario válido
    expect(() => validateUserName(validUserName)).to.not.throw();

    // La función debería lanzar un error ContentError para el nombre de usuario vacío
    expect(() => validateUserName(emptyUserName)).to.throw('Name is empty');

    // La función debería lanzar un error ContentError para el nombre de usuario inválido
    expect(() => validateUserName(invalidUserName)).to.throw('Username is not valid');
  });

  it('should validate password', () => {
    // Validar una contraseña válida
    const validPassword = 'Password1';

    // Validar una contraseña corta
    const shortPassword = 'pass';

    // La función debería pasar sin lanzar errores para la contraseña válida
    expect(() => validatePassword(validPassword)).to.not.throw();

    // La función debería lanzar un error RangeError para la contraseña corta
    expect(() => validatePassword(shortPassword)).to.throw('password is shorter than 8 characters');
  });

  it('should validate text', () => {
    // Validar un texto válido
    const validText = 'This is some text.';

    // Validar un texto vacío
    const emptyText = '';

    // La función debería pasar sin lanzar errores para el texto válido
    expect(() => validateText(validText)).to.not.throw();

    // La función debería lanzar un error ContentError para el texto vacío
    expect(() => validateText(emptyText)).to.throw('Text is empty');
  });

  it('should validate token', () => {
    // Validar un token válido
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.HuzmYLKjBB-rcthyC1I3iRVy42C2C6lgNdzUSx0yfno';

    // Validar un token vacío
    const emptyToken = '';

    // Validar un token con formato incorrecto
    const invalidToken = 'invalid.token';

    // La función debería pasar sin lanzar errores para el token válido
    expect(() => validateToken(validToken)).to.not.throw();

    // La función debería lanzar un error ContentError para el token vacío
    expect(() => validateToken(emptyToken)).to.throw('token is not valid');

    // La función debería lanzar un error ContentError para el token con formato incorrecto
    expect(() => validateToken(invalidToken)).to.throw('token is not valid');
  });

  it('should validate number', () => {
    // Validar un número válido
    const validNumber = 42;

    // Validar una cadena en lugar de un número
    const stringNumber = '42';

    // La función debería pasar sin lanzar errores para el número válido
    expect(() => validateNumber(validNumber)).to.not.throw();

    // La función debería lanzar un error TypeError para la cadena en lugar de un número
    expect(() => validateNumber(stringNumber)).to.throw('number is not a type of number');
  });
});