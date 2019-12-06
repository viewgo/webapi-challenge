const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

//end points
router.get("/", (req, res) => {
    res.send(`
      <h2>Projects Endpoint</h2>
      <p></p>
      `);
})

//custom middleware


module.exports = router;

