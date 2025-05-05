const request = require('supertest');
const app = require('../src/index');

describe('Pruebas de API', () => {
  it('GET / debe responder con Hola Mundo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('¡Hola Mundo desde Docker!');
  });

  it('GET /health debe responder con estado ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});