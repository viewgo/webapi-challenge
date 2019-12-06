const express = require("express");

const projectsRouter = require("../projects/projects-router");
const actionsRouter = require("../actions/actions-router");

const server = express();

server.use(express.json());

//endpoints
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Week 13 Sprint Challenge API</h2>
      <p></p>
      `);
});

module.exports = server;
