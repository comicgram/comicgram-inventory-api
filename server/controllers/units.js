const Unit = require('../models').Unit;

module.exports = {
  list(req, res) {
    return Unit
      .all()
      .then(units => res.status(200).send(units))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Unit
      .findById(req.params.unitId)
      .then(unit => {
        if (!unit) {
          return res.status(404).send({
            message: 'Unit Not Found',
          });
        }
        return res.status(200).send(unit);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Unit
      .create({
        unit: req.body.unit,
        symbol: req.body.symbol,
      })
      .then(unit => res.status(201).send(unit))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Unit
      .findById(req.params.id)
      .then(unit => {
        if (!unit) {
          return res.status(404).send({
            message: 'Unit Not Found',
          });
        }
        return unit
          .update({
            unit: req.body.unit || unit.unit,
            symbol: req.body.symbol || unit.symbol,
          })
          .then(() => res.status(200).send(unit))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Unit
      .findById(req.params.unitId)
      .then(unit => {
        if (!unit) {
          return res.status(400).send({
            message: 'Unit Not Found',
          });
        }
        return unit
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
