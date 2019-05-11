var shell = require('shelljs');
var request = require('supertest');
var app = require('./app');

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
});
