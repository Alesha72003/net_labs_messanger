const models = require("../models");
const { Op, QueryTypes } = require("sequelize");
const { mustAuthenticated } = require("../tools/authTools");
const { whiteListBodyParams } = require("../tools/security");
const { send } = require("../middlewares/6-grpc");

const express = require("express");
const router = express.Router();

router.get("/:id", mustAuthenticated, async (req, res) => {
  const messages = await models.Message.findAll({
    where: {
      [Op.or]: [
        {
          from: req.user.id,
          to: req.params.id
        }, {
          from: req.params.id,
          to: req.user.id
        }
      ]
    },
    order: [
      ['id', 'ASC']
    ],
    include: models.User
  });

  res.send(messages);
});

router.post("/:id", mustAuthenticated, whiteListBodyParams(["text"]), async (req, res) => {
  if (!req.user.isworker && req.params.id !== '0') {
    res.status(403).send("You can send message only to messanger");
    return;
  }
  const newmessage = await models.Message.create({
    from: req.user.id,
    to: req.params.id,
    text: req.body.text
  }, {
    include: models.User
  });
  await newmessage.reload();
  await send(newmessage.dataValues)
  return res.status(201).send(newmessage);
})

router.get("/", mustAuthenticated, async (req, res) => {
  const dialogs = await models.sequelize.query('SELECT * FROM dialogs(?)', {
    replacements: [req.user.id],
    type: QueryTypes.SELECT
  });
  res.send(dialogs);
})

module.exports = {
  '/chat': router
};