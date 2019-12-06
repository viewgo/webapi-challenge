const express = require("express");

const projectsRouter = require("../projects/projects-router");

const server = express();

server.use(express.json());

//endpoints
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Week 13 Sprint Challenge API</h2>
      <p></p>
      `);
});

module.exports = server;
