const Ingredient = require('../models').Ingredient;
const Provider   = require('../models').Provider;
const Unit       = require('../models').Unit;

module.exports = {
  list(req, res) {
    return Ingredient
      .findAll({
        include: [
          { model: Provider, as: 'providers' },
          { model: Unit, as: 'units' }
        ],
      })
      .then(ingredients => res.status(200).send(ingredients))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  },

  retrieve(req, res) {
    return Ingredient
      .findById(req.params.ingredientId, {
        include: [
          { model: Provider, as: 'providers' },
          { model: Unit, as: 'units' }
        ],
      })
      .then(ingredient => {
        if (!ingredient) {
          return res.status(404).send({
            message: 'Ingredient Not Found',
          });
        }
        return res.status(200).send(ingredient);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Ingredient
      .create({
        ingredient: req.body.ingredient,
        provider_id: req.body.provider_id,
        unit_id: req.body.unit_id,
        current_stock: req.body.current_stock,
        desired_stock: req.body.desired_stock
      })
      .then(ingredient => res.status(201).send(ingredient))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  },

  update(req, res) {
    return Ingredient
      .findById(req.params.ingredientId)
      .then(ingredient => {
        if (!ingredient) {
          return res.status(404).send({
            message: 'Ingredient Not Found',
          });
        }
        return ingredient
          .update({
            ingredient: req.body.ingredient,
            provider_id: req.body.provider_id,
            unit_id: req.body.unit_id,
            current_stock: req.body.current_stock,
            desired_stock: req.body.desired_stock
          })
          .then(() => res.status(200).send(ingredient))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Ingredient
      .findById(req.params.ingredientId)
      .then(ingredient => {
        if (!ingredient) {
          return res.status(400).send({
            message: 'Ingredient Not Found',
          });
        }
        return ingredient
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
