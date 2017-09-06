const Recipe     = require('../models').Recipe;
const Ingredient = require('../models').Ingredient;
const Sequelize  = require('sequelize');
const sequelize  = new Sequelize({
  dialect: 'sqlite', storage: `/Users/adrian/Comicgram/comicgram-api-final/comicgram-inventory.sqlite3`
});

module.exports = {
  list(req, res) {
    return Recipe
      .findAll({
        include: [
          {
            model: Ingredient,
            as: 'ingredients',
            through: { attributes: []}
          },
        ]
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  },

  retrieve(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Recipe
      .create({
        recipe: req.body.recipe,
        category_name: req.body.category_name,
        variation_name: req.body.variation_name
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Recipe
      .findById(req.params.id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .update({
            recipe: req.body.recipe || recipe.recipe,
            category_name: req.body.category_name || recipe.category_name,
            variation_name: req.body.variation_name || recipe.variation_name
          })
          .then(() => res.status(200).send(recipe))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then(recipe => {
        if (!recipe) {
          return res.status(400).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
