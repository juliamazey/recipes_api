const shell = require('shelljs');
const request = require('supertest');
const app = require('./app');
const registerUser = { 'email': 'user@email.com', 'password': 'abc', 'password_confirmation': 'abc' }
const emailTaken = { 'email': 'user1@gmail.com', 'password': 'abc', 'password_confirmation': 'abc' }
const badPasswords = { 'email': 'user1@gmail.com', 'password': 'abc', 'password_confirmation': '123' }
const badloginUser = { 'email': 'user100@gmail.com', 'password': 'password'}
const userApiKey = {'apiKey': 'key1'}

describe('api', () => {
  beforeAll(() => {
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

  describe('Test POST /api/v1/recipes/:id path', () => {
    test('should return a 201 status and a confirmation message', () => {
      return request(app).post('/api/v1/recipes/8').send(userApiKey).then(response => {
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Recipe has been saved!');
      });
    });

    test('should return a 401 status if invalid API key is given', () => {
      return request(app).post('/api/v1/recipes/8').send({'apiKey': 'invalid_key'}).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 401 status if no API key is given', () => {
      return request(app).post('/api/v1/recipes/8').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 404 status if the recipe cannot be found', () => {
      return request(app).post('/api/v1/recipes/999').send(userApiKey).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Recipe could not be saved');
      });
    });
  });

  describe('Test POST /api/v1/login path', () => {
    test('should return a 200 status and an API key', () => {
      return request(app).post('/api/v1/login').send(registerUser).then(response => {
        expect(response.status).toBe(200);
        expect(typeof response.body.apiKey).toBe('string');
      });
    });

    test('should return a 401 status if invalid information provided', () => {
      return request(app).post('/api/v1/login').send(badloginUser).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid username or password');
      });
    });

    test('should return a 401 status if missing information', () => {
      return request(app).post('/api/v1/login').send({'email': 'user@gmail.com'}).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('You need to send a password and email');
      });
    });
  });

  describe('Test GET /api/v1/recipes/sort_time path', () => {
    test('should return a 200 status and recipes sorted by cooking time', () => {
      return request(app).get('/api/v1/recipes/sort_time').send(userApiKey).then(response => {
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(2);
        expect(response.body[1].id).toBe(3);
      });
    });

    test('should return a 401 status if API key is invalid', () => {
      return request(app).get('/api/v1/recipes/sort_time').send({ 'apiKey': 'invalid_key' }).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 401 status if API key is not given', () => {
      return request(app).get('/api/v1/recipes/sort_time').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 404 status if the user has no recipes saved', () => {
      return request(app).get('/api/v1/recipes/sort_time').send({ 'apiKey': 'key5' }).then(response => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No recipes saved');
      });
    });
  });

  describe('Test GET /api/v1/recipes/sort_calories path', () => {
    test('should return a 200 status and recipes sorted by cooking calories', () => {
      return request(app).get('/api/v1/recipes/sort_calories').send(userApiKey).then(response => {
        expect(response.status).toBe(200);
        expect(response.body[0].calories).toBe(195.359404222222);
        expect(response.body[1].calories).toBe(1240.30266666667);
      });
    });

    test('should return a 401 status if API key is invalid', () => {
      return request(app).get('/api/v1/recipes/sort_calories').send({ 'apiKey': 'invalid_key' }).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 401 status if API key is not given', () => {
      return request(app).get('/api/v1/recipes/sort_calories').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 404 status if the user has no recipes saved', () => {
      return request(app).get('/api/v1/recipes/sort_calories').send({ 'apiKey': 'key5' }).then(response => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No recipes saved');
      });
    });
  });

  describe('Test GET /api/v1/recipes/sort_type path', () => {
    test('should return a 200 status and recipes sorted alphabetically by dish type', () => {
      return request(app).get('/api/v1/recipes/sort_type').send(userApiKey).then(response => {
        expect(response.status).toBe(200);
        expect(response.body[0].dishType).toBe('breakfast');
        expect(response.body[1].dishType).toBe('dessert');
        expect(response.body[3].dishType).toBe('lunch');
      });
    });

    test('should return a 401 status if API key is invalid', () => {
      return request(app).get('/api/v1/recipes/sort_type').send({ 'apiKey': 'invalid_key' }).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 401 status if API key is not given', () => {
      return request(app).get('/api/v1/recipes/sort_type').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 404 status if the user has no recipes saved', () => {
      return request(app).get('/api/v1/recipes/sort_type').send({ 'apiKey': 'key5' }).then(response => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No recipes saved');
      });
    });
  });

  describe('Test DELETE /api/v1/recipes/:id path', () => {
    test('should return a 204 status', () => {
      return request(app).delete('/api/v1/recipes/1').send(userApiKey).then(response => {
        expect(response.status).toBe(204);
      });
    });

    test('should return a 401 status if invalid API key is given', () => {
      return request(app).delete('/api/v1/recipes/1').send({'apiKey': 'invalid_key'}).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 401 status if no API key is given', () => {
      return request(app).delete('/api/v1/recipes/8').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid API key');
      });
    });

    test('should return a 404 status if the recipe cannot be found', () => {
      return request(app).delete('/api/v1/recipes/1').send(userApiKey).then(response => {
        console.log(response.body)
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No recipe found with id 1');
      });
    });
  });
});
