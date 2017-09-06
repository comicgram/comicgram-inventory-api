const Order      = require('../models').Order;
const Recipe     = require('../models').Recipe;
const Ingredient = require('../models').Ingredient;
const IngredientRecipe = require('../models').IngredientRecipe;
const Unit = require('../models').Unit
const Promise    = require('bluebird');
const Sequelize  = require('sequelize');
const _          = require('underscore');
const sequelize  = new Sequelize({
  dialect: 'sqlite', storage: `/comicgram-inventory.sqlite3`
});

module.exports = {
  list(req, res) {
    return Order
      .all()
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Order
      .findAll({ where: { order_id: req.params.orderId }})
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return res.status(200).send(order);
      })
      .catch(error => res.status(400).send(error));
  },

  // create(req, res) {
  //   Promise.map(req.body, order_json => {
  //     return sequelize.transaction(t => {
  //       return Order
  //         .findAll({
  //           where: {
  //             order_id: order_json.id
  //           }
  //         }, { transaction: t })
  //         .then(order => {
  //           if (order.length == 0) {
  //             Order
  //               .create({
  //                 order_id: order_json.id,
  //                 receipt_url: order_json.receipt_url
  //               })
  //
  //             Promise.map(order_json.itemizations, product => {
  //               // return sequelize.transaction(t2 => {
  //                 return Recipe
  //                   .findAll({
  //                     where: {
  //                       recipe: product.name,
  //                       variation_name: product.item_variation_name
  //                     }
  //                   })
  //                   .then(recipe => {
  //                     console.log(recipe);
  //                   })
  //               // }) // transaction t2
  //             }) // _.map
  //           } // if
  //         })
  //       })
  //       .then(result => res.status(200).send())
  //       .catch(error => {
  //         res.status(400).send(error)
  //         console.log(error);
  //       });
  //   })
  //   .then(() => res.status(200).send())
  // },

  create(req, res) {
    sequelize.transaction().then(t => {
      Promise.map(req.body, json => {
        return Order
          .findAll({ where: { order_id: json.id }})
          .then(order => {
            if (order.length == 0) {
              return Order
                .create({
                  order_id: json.id,
                  receipt_url: json.receipt_url
                })
            }
          })
          .then(() => {
            _.map(json.itemizations, product => {
              return Recipe
                .findAll({
                    attributes: [
                      'id', 'recipe', 'category_name', 'variation_name'
                    ],
                    where: {
                      recipe: product.name,
                      category_name: product.item_detail.category_name,
                      variation_name: product.item_variation_name,
                    },
                    include: [{
                      model: Ingredient,
                      include: [{
                        model: Unit,
                        attributes: ['unit'],
                        as: 'units',
                      }],
                      attributes: [
                        'id', 'ingredient', 'unit_id'
                      ],
                      as: 'ingredients',
                      through: {
                        model: IngredientRecipe, as: 'portions',
                        attributes: ['portion', 'unit_id']
                      },
                    }]
                })
                .then(recipes => {
                  res.status(200).send(recipes)
                  console.log(recipes);
                })
            })
          })
      })
      .then(() => {
        t.commit();
        // res.status(200).send(
        //   { status: 200, response: 'Orders Processed Correctly' }
        // )
      })
      .catch((err) => {
        t.rollback();
        res.status(400).send(err);
      })  // Promise
    })
  },

  destroy(req, res) {
    return Order
      .findAll({ where: { order_id: req.params.orderId }})
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }
        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
