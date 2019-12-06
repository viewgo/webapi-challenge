const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
      <h2>Week 13 Sprint Challenge API</h2>
      <p></p>
      `);
});

module.exports = server;
