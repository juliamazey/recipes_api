# Recipes API

## Introduction

Quantified Self is a calorie tracker app split into three parts: two microservices and a frontend. The first microservice is the [Quantified Self](https://github.com/juliamarco/quantified_self) service that can foods and meals along with calorie information. The second microservice is the [Recipes API](https://github.com/juliamarco/recipes_api) which accesses the Edamam recipe API database to search for and save favorite recipes for a user. Finally, the [Quantified Self Frontend](https://github.com/juliamarco/quantified_self_fe) for our application creates a basic user interface for interacting with our microservices using React.

## Local Setup

To run the project locally, you will need to clone down the [Quantified Self](https://github.com/juliamarco/quantified_self), [Recipes API](https://github.com/juliamarco/recipes_api), and [Quantified Self Frontend](https://github.com/juliamarco/quantified_self_fe) repos.

    git clone https://github.com/juliamarco/quantified_self.git
    git clone https://github.com/juliamarco/recipes_api.git
    git clone https://github.com/juliamarco/quantified_self_fe.git
    
In each directory you will need to install node packages

    npm install
    
Then in the quantified self and recipes api microservices, you will need to create, migrate, and seed your database

    npx sequelize db:create
    npx sequelize db:migrate
    npx sequelize db:seed:all
    
You will also need access to an [Edamam Recipe API key](https://developer.edamam.com/edamam-recipe-api) to use the recipes api microservice. After signing up, create environment variables for the recipes api by creating a .env file in the root directory and adding the following

    app_key=edamam_app_key
    app_id=edamam_app_id
    
Finally, you can start each of the three apps locally

    npm start

and visit the frontend homepage by navigating to http://localhost:3000/

## API Endpoints

Once the microservices are running locally, you can make API requests to the following endpoints

## Quantified Self API Endpoints

The following endpoints are used to access the quantified self microservice

### Get Foods

Users can retrieve all foods in the database by making a request to the following endpoint:

    GET /api/v1/foods

If the request is successful, foods will be returned in the following format:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

### Get Food by id

Users can retrieve a food by id by making a request to the following endpoint:

    GET /api/v1/foods/:id
    

If the request is successful, the food with id = :id will be returned in the following format:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

### Create Food

Users can create a new food by making a request to the following endpoint:

    POST /api/v1/foods/
    
With a body that has the following format:
```
{
    "name": food_name,
    "calories": 100
}
```

If the request is successful, the new food will be created and returned in the following format:
```
{
    "id": 10,
    "name": "new_food",
    "calories": 100,
    "updatedAt": current_time,
    "createdAt": current_time
}
```

### Edit Food

Users can create a new food by making a request to the following endpoint:

    PATCH /api/v1/foods/:id
    
With a body that has the following format:
```
{
    "name": edited_name,
    "calories": 200
}
```

If the request is successful, the food with id = :id will be edited and returned in the following format:
```
{
    "id": 10,
    "name": "edited_name",
    "calories": 2==,
    "updatedAt": current_time,
    "createdAt": created_time
}
```

### Delete Food

Users can create a new food by making a request to the following endpoint:

    DELETE /api/v1/foods/:id

If the request is successful, the food with id = :id will be deleted and a 204 status will be returned.

### Get Meals

Users can retrieve all meals in the database and their associated foods by making a request to the following endpoint:

    GET /api/v1/meals

If the request is successful, foods will be returned in the following format:
```
[
    {
        "id": 1,
        "name": "Fruit Salad",
        "Food": [
            {
                "id": 3,
                "name": "Kiwi",
                "calories": 50
            },
            {
                "id": 2,
                "name": "Apple",
                "calories": 70
            }
        ]
    },
```

### Get Foods for a Meal

Users can retrieve all foods for a meal by making a request to the following endpoint:

    GET /api/v1/meals/:meal_id/foods

If the request is successful, the meal with id = :meal_id and all associated foods will be returned in the following format:
```
{
    "id": 1,
    "name": "Fruit Salad",
    "Food": [
        {
            "id": 2,
            "name": "Apple",
            "calories": 70
        },
        {
            "id": 3,
            "name": "Kiwi",
            "calories": 50
        }
    ]
}
```

### Add a Food to a Meal

Users can add a food to a meal by making a request to the following endpoint:

    POST /api/v1/meals/:meal_id/foods/:id

If the request is successful, the food with id = :id will be added to the meal with id = :meal_id and a confirmation message will be returned with the following format:
```
{
    "message": "Successfully added FOOD to MEAL"
}
```

### Remove a Food from a Meal

Users can remove a food from a meal by making a request to the following endpoint:

    DELETE /api/v1/meals/:meal_id/foods/:id
    
If the request is successful, the food with id = :id will be removed from the meal with id = :meal_id and a 204 status will be returned.

## Recipes API Endpoints

The following endpionts are used to access the Recipes API microservice

### Register User Account

Visitors can register an account by making a request to the following endpoint:

    POST /api/v1/login
    
With a body that has the following format:
```
{
    "email": "newuser@email.com",
    "password": "abc",
    "password_confirmation": "abc"
}
```

If the request is successful, a user will be created and assigned an API key, which will be returned in the following format:
```
{
    "apiKey": "68149a58-e524-44b1-bd90-ac3dc4e0f90c"
}
```

### Retrieve User API key

A user can retrieve their API key by making a request to the following endpoint:

    POST /api/v1/login

With a body that has the following format:
```
{
    "email": "newuser@email.com",
    "password": "abc"
}
```

If the request is successful, the user's API key will be returned in the following format:

```
{
    "apiKey": "68149a58-e524-44b1-bd90-ac3dc4e0f90c"
}
```

### Search for Recipe by Dish Type

Users can search for a recipe of a certain dish type (breakfast, lucnch, dessert, etc.) by making a request to the following endpoint:

    GET /api/v1/recipes?dish_type=:dish_type&search=:search_query

If the request is successful, a recipe of that dish type will be saved in the database and returned in the following format:
```
{
    "id": 16,
    "name": "Baked Eggs",
    "dishType": "breakfast",
    "image": "https://www.edamam.com/web-img/7c0/7c06d6352abacc41e169a954ebc3740e.jpg",
    "recipeUrl": "http://leitesculinaria.com/96610/recipes-baked-eggs.html",
    "dietLabels": [
        "Low-Carb"
    ],
    "healthLabels": [
        "Sugar-Conscious",
        "Peanut-Free",
        "Tree-Nut-Free",
        "Alcohol-Free"
    ],
    "ingredientList": [
        "Vegetable oil or butter, for the muffin tin",
        "6 large eggs (choose eggs of a very similar size)",
        "2 tablespoons chopped, slightly undercooked bacon (figure 2 slices)",
        "1/4 cup grated Parmesan (optional)",
        "Salt and freshly ground black pepper, to taste"
    ],
    "calories": 528.031975248974,
    "cookingTime": 0,
    "updatedAt": "2019-05-15T15:28:24.542Z",
    "createdAt": "2019-05-15T15:28:24.542Z"
}
```

### Save Recipe by id

Users can save a favorite recipe by making a request to the following endpoint:

    POST /api/v1/recipes/:id

With a body containing their API key in the following format:
```
{
    "apiKey": "68149a58-e524-44b1-bd90-ac3dc4e0f90c"
}
```

If the request is successful, and the recipe with id = :id will be saved for the user and the following confirmation message will be returned:
```
{
    "message": "Recipe has been saved!"
}
```

### Delete Recipe by id

Users can delete a favorite recipe by making a request to the following endpoint:

    DELETE /api/v1/recipes/:id

With a body containing their API key in the following format:
```
{
    "apiKey": "68149a58-e524-44b1-bd90-ac3dc4e0f90c"
}
```

If the request is successful, and the recipe with id = :id will be deleted for the user and a 204 status will be returned.

### Sort Saved Recipes by Dish Type, Cooking Time, or Total Calories

Users can get a list of their favorite recipes sorted by dish type, cooking time (low to high), or total calories (low to high) by making a request to one of the following endpoints:

    GET /api/v1/recipes/sort_type
    GET /api/v1/recipes/sort_time
    GET /api/v1/recipes/sort_calories

With a body containing their API key in the following format:
```
{
    "apiKey": "68149a58-e524-44b1-bd90-ac3dc4e0f90c"
}
```

If the request is successful, the user's saved recipes will be returned in the requested order in the following format:
```
[
    {
        "id": 2,
        "name": "Pear Sorbet",
        "dishType": "dessert",
        "image": "https://www.edamam.com/web-img/f87/f875badce3d7190104f8ffb1d559ea3e.jpg",
        "recipeUrl": "http://www.lottieanddoof.com/2010/02/pear-sorbet/",
        "dietLabels": [
            "Low-Fat"
        ],
        "healthLabels": [
            "Vegan",
            "Vegetarian",
            "Peanut-Free",
            "Tree-Nut-Free"
        ],
        "ingredientList": [
            "5 x ripe,juicy pears",
            "3/4 cup Granulated Sugar",
            "1/4 cup Pear Brandy"
        ],
        "calories": 1240.30266666667,
        "cookingTime": 20
    },
    {
        "id": 1,
        "name": "Chicken Vesuvio",
        "dishType": "lunch",
        "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
        "recipeUrl": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "dietLabels": [
            "Low-Carb"
        ],
        "healthLabels": [
            "Peanut-Free",
            "Tree-Nut-Free"
        ],
        "ingredientList": [
            "1/2 cup olive oil",
            "5 cloves garlic, peeled",
            "2 large russet potatoes, peeled and cut into chunks",
            "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
            "3/4 cup white wine",
            "3/4 cup chicken stock",
            "3 tablespoons chopped parsley",
            "1 tablespoon dried oregano",
            "Salt and pepper",
            "1 cup frozen peas, thawed"
        ],
        "calories": 4230.30569120108,
        "cookingTime": 60
    }
]
```
## Hosted Microservices
- Quantified Self - hosted at: https://still-earth-89329.herokuapp.com
- Recipes API - hosted at: https://blooming-oasis-66564.herokuapp.com

## How to Contribute
If you would like to contribute to this project, you can do the following:

  1. Fork this repo on GitHub
  2. Clone the project to your own machine
  3. Commit changes to your own branch
  4. Push your work back up to your fork
  5. Submit a pull request to the original repo describing your changes

## Contributors
- [Chris Lewis](https://github.com/csvlewis)
- [Julia Marco](https://github.com/juliamarco)

## Schema Visualizations

## Quantified Self Schema

![Quantified Self Schema Visualization](/quantified_self_db.png?raw=true)

## Recipes API Schema

![Recipes API Schema Visualization](/recipes_api_db.png?raw=true)

## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)
- [React](https://reactjs.org/)
- [Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api)

