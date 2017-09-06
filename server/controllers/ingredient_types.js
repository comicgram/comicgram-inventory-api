const IngredientType = require('../models').IngredientType;

module.exports = {
  list(req, res) {
    return IngredientType
      .all()
      .then(ingredient_type => res.status(200).send(ingredient_type))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return IngredientType
      .findById(req.params.ingredientTypeId)
      .then(ingredient_type => {
        if (!ingredient_type) {
          return res.status(404).send({
            message: 'Ingredient Type Not Found',
          });
        }
        return res.status(200).send(ingredient_type);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return IngredientType
      .create({
        ingredient_type: req.body.ingredient_type
      })
      .then(ingredient_type => res.status(201).send(ingredient_type))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return IngredientType
      .findById(req.params.ingredientTypeId)
      .then(ingredient_type => {
        if (!ingredient_type) {
          return res.status(404).send({
            message: 'Ingredient Type Not Found',
          });
        }
        return ingredient_type
          .update({
            ingredient_type: req.body.ingredient_type || ingredient_type.ingredient_type,
          })
          .then(() => res.status(200).send(ingredient_type))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return IngredientType
      .findById(req.params.ingredientTypeId)
      .then(ingredient_type => {
        if (!ingredient_type) {
          return res.status(400).send({
            message: 'Ingredient Type Not Found',
          });
        }
        return ingredient_type
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
