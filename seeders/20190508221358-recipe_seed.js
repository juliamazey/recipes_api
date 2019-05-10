'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Recipes', [
    {
      id: 1,
      name: 'Chicken Vesuvio',
      image: 'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
      recipeUrl: 'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
      dietLabels: ["Low-Carb"],
      healthLabels:  [
          "Peanut-Free",
          "Tree-Nut-Free"
      ],
      ingredientList: [
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
      calories: 4230.305691201081,
      cookingTime: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Pear Sorbet',
      image: 'https://www.edamam.com/web-img/f87/f875badce3d7190104f8ffb1d559ea3e.jpg',
      recipeUrl: 'http://www.lottieanddoof.com/2010/02/pear-sorbet/',
      dietLabels: ["Low-Fat"],
      healthLabels:  [
          "Vegan",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free"
      ],
      ingredientList: [
          "5 x ripe,juicy pears",
          "3/4 cup Granulated Sugar",
          "1/4 cup Pear Brandy"
      ],
      calories: 1240.3026666666667,
      cookingTime: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Chocolate Pie Crust',
      image: 'https://www.edamam.com/web-img/4d9/4d92006b030763f551ce22e97d074555.jpg',
      recipeUrl: 'http://www.seriouseats.com/recipes/2009/11/serious-chocolate-chocolate-pie-crust.html',
      dietLabels: [""],
      healthLabels:  [
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "2 cups chocolate wafers or 2 cups chocolate graham crackers",
          "1/4 cup sugar",
          "3/4 stick of butter (6 tablespoons)"
      ],
      calories: 1771.0775,
      cookingTime: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Pandan Wrapped Roast Pork',
      image: 'https://www.edamam.com/web-img/ae4/ae4608a482557f6e8c33881d8436a5db.jpg',
      recipeUrl: 'http://norecipes.com/pandan-wrapped-roast-pork',
      dietLabels: ["Low-Carb"],
      healthLabels:  [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "14 pandan (screw pine) leaves",
          "4 lbs pork butt or other well marbled cut of pork cut into large chunks",
          "Smoked sea salt"
      ],
      calories: 3618.7435704000004,
      cookingTime: 120,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      name: 'Carrot-Mango Smoothie',
      image: 'https://www.edamam.com/web-img/56a/56a94ccfd84701ca46ad1eae781e8058.jpg',
      recipeUrl: 'http://www.marthastewart.com/318337/carrot-mango-smoothie',
      dietLabels: ["Low-Carb"],
      healthLabels:  [
          "Vegan",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "1/2 cup carrot juice",
          "1/4 cup frozen mango chunks",
          "1/4 cup ice cubes"
      ],
      calories: 71.95,
      cookingTime: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      name: 'Celery Remoulade',
      image: 'https://www.edamam.com/web-img/fde/fdead8cb5dc7aade23b352c0efd5da8e.jpg',
      recipeUrl: 'http://www.davidlebovitz.com/2010/04/celery-root-remoulade-celeri-rem/',
      dietLabels: ["Low-Carb"],
      healthLabels:  [
          "Sugar-Conscious",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "1 cup mayonnaise",
          "2 1/2 tbsp Dijon mustard",
          "1 tsp sea salt",
          "2 tbsp freshly squeezed lemon juice",
          "freshly ground black pepper",
          "2 1/4 pounds celery root"
      ],
      calories: 2065.778975253727,
      cookingTime: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      name: 'Sushi Rice',
      image: 'https://www.edamam.com/web-img/c81/c81125357d071aa371c860be73f49d29.jpg',
      recipeUrl: 'http://norecipes.com/blog/sushi-rice-recipe/',
      dietLabels: ["Low-Fat"],
      healthLabels:  [
          "Vegan",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "2 rice cooker cups short grain (11.5 ounces or 326 grams)",
          "1 1/2 cups cold water (355 mililiters)",
          "4 tablespoons rice vinegar",
          "3 tablespoons granulated sugar",
          "1 teaspoon salt"
      ],
      calories: 198.414,
      cookingTime: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      name: 'Baked Potato Snack',
      image: 'https://www.edamam.com/web-img/633/6330c4b566f8eba34eb1c5a4e66aa43e',
      recipeUrl: 'http://www.marthastewart.com/353269/baked-potato-snack',
      dietLabels: ["Low-Fat"],
      healthLabels:  [
          "Sugar-Conscious",
          "Vegan",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      ingredientList: [
          "1 medium sweet potato, or baking potato",
          "ground black pepper",
          "salt"
      ],
      calories: 195.3594042222222,
      cookingTime: 70,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
