const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

//end points
router.get("/", (req, res) => {
  projects
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error on GET /api/projects", err);
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved" });
    });
});

//custom middleware

module.exports = router;
