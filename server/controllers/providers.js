const Provider = require('../models').Provider;

module.exports = {
  list(req, res) {
    return Provider
      .all()
      .then(providers => res.status(200).send(providers))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Provider
      .findById(req.params.providerId)
      .then(provider => {
        if (!provider) {
          return res.status(404).send({
            message: 'Provider Not Found',
          });
        }
        return res.status(200).send(provider);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Provider
      .create({
        provider: req.body.provider,
      })
      .then(provider => res.status(201).send(provider))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Provider
      .findById(req.params.providerId)
      .then(provider => {
        if (!provider) {
          return res.status(404).send({
            message: 'Provider Not Found',
          });
        }
        return provider
          .update({
            provider: req.body.provider || provider.provider
          })
          .then(() => res.status(200).send(provider))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Provider
      .findById(req.params.providerId)
      .then(provider => {
        if (!provider) {
          return res.status(400).send({
            message: 'Provider Not Found',
          });
        }
        return provider
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
