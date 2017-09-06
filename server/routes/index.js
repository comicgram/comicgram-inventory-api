const recipesController         = require('../controllers').recipes;
const unitsController           = require('../controllers').units;
const ingredientTypesController = require('../controllers').ingredient_types;
const providersController       = require('../controllers').providers;
const ingredientsController     = require('../controllers').ingredients;
const ordersController          = require('../controllers').orders;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/recipes', recipesController.create);
  app.get('/api/recipes/', recipesController.list);
  app.get('/api/recipes/:recipeId', recipesController.retrieve);
  app.put('/api/recipes/:recipeId', recipesController.update);
  app.delete('/api/recipes/:recipeId', recipesController.destroy);

  app.post('/api/units', unitsController.create);
  app.get('/api/units/', unitsController.list);
  app.get('/api/units/:unitId', unitsController.retrieve);
  app.put('/api/units/:unitId', unitsController.update);
  app.delete('/api/units/:unitId', unitsController.destroy);

  app.post('/api/ingredient_types', ingredientTypesController.create);
  app.get('/api/ingredient_types', ingredientTypesController.list);
  app.get('/api/ingredient_types/:ingredientTypeId', ingredientTypesController.retrieve);
  app.put('/api/ingredient_types/:ingredientTypeId', ingredientTypesController.update);
  app.delete('/api/ingredient_types/:ingredientTypeId', ingredientTypesController.destroy);

  app.post('/api/providers', providersController.create);
  app.get('/api/providers', providersController.list);
  app.get('/api/providers/:providerId', providersController.retrieve);
  app.put('/api/providers/:providerId', providersController.update);
  app.delete('/api/providers/:providerId', providersController.destroy);

  app.post('/api/ingredients', ingredientsController.create);
  app.get('/api/ingredients', ingredientsController.list);
  app.get('/api/ingredients/:ingredientId', ingredientsController.retrieve);
  app.put('/api/ingredients/:ingredientId', ingredientsController.update);
  app.delete('/api/ingredients/:ingredientId', ingredientsController.destroy);

  app.post('/api/orders', ordersController.create);
  app.get('/api/orders', ordersController.list);
  app.get('/api/orders/:ordeId', ordersController.retrieve);
  app.delete('/api/orders/:ordeId', ordersController.destroy);
};
