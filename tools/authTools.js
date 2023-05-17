const models = require("../models");
const crypto = require("crypto");

module.exports = {

  mustAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("401 NOT AUTHORIZED");
    }
    next();
  },

  checkAccessToTask: (req, res, next) => {
    const user = models.User.findOne({
      attributes: ['id'],
      where: {
        id: req.user.id
      },
      include: {
        model: models.Group,
        attributes: ['id'],
        include: {
          model: models.Task,
          attributes: ['id'],
          required: true,
          where: {
            id: req.params.id
          }
        }
      }
    });
    return user ? next() : res.status(403).send("Access denied");
  },

  itsMe: (req, res, next) => {
    if (req.user.id != req.params.id) {
      return res.status(403).send("Access denied");
    }
    next();
  },

  hashPassword: password => crypto.createHash('sha256').update(password).digest("hex")

};