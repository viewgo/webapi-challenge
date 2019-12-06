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

router.get("/:id", validateProjectId, (req, res) => {
    projects
        .get(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
})

//custom middleware
function validateProjectId(req, res, next){
    projects
    .get(req.params.id)
    .then(project => {
        if(project){
            next();
        } else {
            res.status(404).json({message: "The project with the specified ID does not exist."});
        }
    })
    .catch(err => {
        console.log(`error on GET /projects/:id`, err);
        res
          .status(500)
          .json({ error: "The project information could not be retrieved." });
      });
}


//export
module.exports = router;
