import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  isTokenAlive,
  isTokenValid,
  extractSubFromToken,
} from './utils';

describe('Token Functions', () => {
  it('should check if a token is alive', () => {
    // Crear un token válido con tiempo de vida de 1 minuto
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzMwNjg5MTYsImV4cCI6MTYzMzA2OTUxNn0.PsSfjTmhi0g-LLhSS8fT4R2wQSmYtsppysV5x5AHL7E';

    // La función debería devolver true ya que el token es válido y está vivo
    const result = isTokenAlive(token);

    expect(result).to.equal(true);
  });

  it('should check if a token is valid', () => {
    // Crear un token válido
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjMzMDY4OTE2LCJleHAiOjE2MzMwNjk1MTZ9.PsSfjTmhi0g-LLhSS8fT4R2wQSmYtsppysV5x5AHL7E';

    // Crear un token inválido
    const invalidToken = 'invalidtoken';

    // La función debería devolver true para el token válido y false para el token inválido
    const validResult = isTokenValid(validToken);
    const invalidResult = isTokenValid(invalidToken);

    expect(validResult).to.equal(true);
    expect(invalidResult).to.equal(false);
  });

  it('should extract sub from a token', () => {
    // Crear un token con un campo "sub" específico
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.HuzmYLKjBB-rcthyC1I3iRVy42C2C6lgNdzUSx0yfno';

    // La función debería devolver el campo "sub" del token
    const sub = extractSubFromToken(token);

    expect(sub).to.equal('1234567890');
  });
});
