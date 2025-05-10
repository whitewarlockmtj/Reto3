const request = require('supertest');
const app = require('../src/index');
const UserController = require('../src/userController');

describe('User Controller', () => {
  beforeEach(() => {
    // Reset posts array before each test
    //users.length = 0;
    UserController.users = [];
    UserController.users.push(
      { id: 1, user: 'FirstUser', name: 'First User' },
      { id: 2, user: 'SecondUser', name: 'Second User' }
    );
    UserController.nextId = 2;
  });

  describe('Pruebas de API', () => {
    it('GET / debe responder con Hola Mundo', async () => {
      const res = await request(app).get('/hello');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('¡Hola Mundo desde Docker!');
    });
  
    it('GET /health debe responder con estado ok', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });
  
  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  });

  describe('GET /users/:id', () => {
    it('should get a single user', async () => {
      const res = await request(app).get('/users/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('First User');
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/users/999');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { user: 'NewUser', name: 'New User' };
      const res = await request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.user).toEqual(newUser.user);
      expect(res.body.id).toBeDefined();
      expect(UserController.users.length).toEqual(3);
    });

    it('should return 400 for missing user or name', async () => {
      const res1 = await request(app)
        .post('/users')
        .send({ name: 'No user' });
      expect(res1.statusCode).toEqual(400);

      const res2 = await request(app)
        .post('/users')
        .send({ user: 'No name' });
      expect(res2.statusCode).toEqual(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app).delete('/users/1');
      expect(res.statusCode).toEqual(204);
      expect(UserController.users.length).toEqual(1);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).delete('/users/999');
      expect(res.statusCode).toEqual(404);
    });
  });
});