const shell = require('shelljs');
const request = require('supertest');
const app = require('./app');
const registerUser = { 'email': 'user@email.com', 'password': 'abc', 'password_confirmation': 'abc' }
const emailTaken = { 'email': 'user1@gmail.com', 'password': 'abc', 'password_confirmation': 'abc' }
const badPasswords = { 'email': 'user1@gmail.com', 'password': 'abc', 'password_confirmation': '123' }

describe('api', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate:undo:all');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  describe('Test GET /api/v1/recipes path', () => {
    test('should return a 200 status', () => {
      return request(app).get('/api/v1/recipes?dish_type=breakfast&search=potato').then(response => {
        expect(response.status).toBe(200);
      });
    });

    test('should return a recipe object by dish type', () => {
      shell.exec('npx sequelize db:seed:undo:all');
      return request(app).get('/api/v1/recipes?dish_type=breakfast&search=potato').then(response => {
        expect((response.body.dishType)).toBe('breakfast'),
        expect(response.body.name).toBe('Baked Potato Snack recipes'),
        expect(response.body.calories).toBe(195.359404222222);
      });
    });

    test('should return a 400 if dish_type not given', () => {
      return request(app).get('/api/v1/recipes?dish_type=breakfast').then(response => {
        expect(response.status).toBe(400)
      });
    });

    test('should return a 400 if search_query not given', () => {
      return request(app).get('/api/v1/recipes?search=potato').then(response => {
        expect(response.status).toBe(400)
      });
    });
  });

  describe('Test POST /api/v1/registration path', () => {
    test('should return a 201 status and an API key', () => {
      return request(app).post('/api/v1/users').send(registerUser).then(response => {
        expect(response.status).toBe(201);
        expect(typeof response.body.apiKey).toBe('string');
      });
    });

    test('should return a 400 status if username is already taken', () => {
      return request(app).post('/api/v1/users').send(emailTaken).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email has been taken');
      });
    });

    test('should return a 400 status if password is not confirmed', () => {
      return request(app).post('/api/v1/users').send(badPasswords).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Passwords do not match');
      });
    });
  });
});
