const mockUsers = require("../data/mockusers");

const express = require("express");
const app = express();
app.use(express.json());
const Port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("route works !");
});
app.get("/api/users", (req, res) => {
  const {
    query: { filter: value },
  } = req;
  if (!filter && !value) return res.status(200).send(mockUsers);
  if (filter && value)
    return res
      .status(200)
      .send(mockUsers.filter((user) => user[filter].includes(value)));
  res.status(200).send([mockUsers]);
});
app.get("/api/users/:id", (req, res) => {
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
app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findIndexUser = mockUsers.findIndex((user) => user.id === parseId);
  if (findIndexUser === -1) return res.status(404);
  mockUsers[findIndexUser] = { id: parseId, ...body };
  return res.status(200).send(mockUsers[findIndexUser]);
});
app.patch("/api/users/:id", (req, res) => {
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
app.delete("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUser = mockUsers.findIndex((u) => u.id === parsedId);
  if (findUser === -1) return res.status(404).send("User not found !!");
  const deleteUser = mockUsers.splice(findUser, 1);
  return res.status(200).send(deleteUser);
});
app.get("/products", (req, res) => {
  res.status(200).send([
    { id: 1, username: "phone", price: 2400 },
    { id: 2, username: "laptop", price: 3000 },
    { id: 3, username: "television", price: 7000 },
    { id: 4, username: "shoes", price: 100 },
  ]);
});
app.listen(Port, () => {
  console.log("running on port ", Port);
});
