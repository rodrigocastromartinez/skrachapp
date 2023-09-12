import mongoose from 'mongoose';
import dbConnect from './dbConnect';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe('dbConnect', () => {
  before(async () => {
    // Conectar a la base de datos antes de ejecutar las pruebas
    await dbConnect();
  });

  after(async () => {
    // Desconectar la base de datos después de ejecutar las pruebas
    await mongoose.disconnect();
  });

  it('successfully connects to the database', async () => {
    const connection = mongoose.connection;
    expect(connection.readyState).to.equal(1); // 1 significa que la conexión se estableció con éxito
  });

  it('returns a cached connection', async () => {
    const firstConnection = await dbConnect();
    const secondConnection = await dbConnect();
    expect(firstConnection).to.equal(secondConnection); // Deberían ser la misma conexión en caché
  });
});
