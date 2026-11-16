const express = require("express");
const router = express.Router();
const mockUsers = require("../../data/mockusers");

router.get("/", (req, res) => {
  console.log("ahaaaa : ",req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log("session data :: ", sessionData);
  });
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.status(200).send(mockUsers);

  if (filter && value)
    return res
      .status(200)
      .send(mockUsers.filter((user) => user[filter]?.includes(value)));

  return res.sendStatus(400);
});

router.get("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "bad request .invalid ID" });
  }

  const findUser = mockUsers.find((u) => u.id === parsedId);
  if (!findUser) {
    return res.status(404).send("user not found");
  }

  res.status(200).send(findUser);
});

router.post("/", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

router.put("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);

  const findIndexUser = mockUsers.findIndex((user) => user.id === parseId);
  if (findIndexUser === -1) return res.sendStatus(404);

  mockUsers[findIndexUser] = { ...body, id: parseId };
  return res.status(200).send(mockUsers[findIndexUser]);
});

router.patch("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUser = mockUsers.findIndex((u) => u.id === parsedId);
  if (findUser === -1) return res.status(404).send("user not found !!");

  mockUsers[findUser] = { ...mockUsers[findUser], ...body };
  return res.status(200).send(mockUsers[findUser]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUser = mockUsers.findIndex((u) => u.id === parsedId);
  if (findUser === -1) return res.status(404).send("User not found !!");

  const deleteUser = mockUsers.splice(findUser, 1);
  return res.status(200).send(deleteUser);
});

module.exports = router;
