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
    .catch(err => {
      console.log(`error on GET /projects/${req.params.id}`, err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.post("/", validateProject, (req, res) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(`error on POST /projects`, err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
    projects
        .remove(req.params.id)
        .then(response => {
            res.status(200).json({message: "Project deleted successfully."});
        })
        .catch(err => {
            console.log(`error on DELETE /projects/${req.params.id}`, err);
            res
              .status(500)
              .json({ error: "The project information could not be deleted." });
          });
})

router.put("/:id", validateProjectId, validateProject, (req, res) => {
    projects
        .update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(`error on PUT /projects/${req.params.id}`, err);
            res
              .status(500)
              .json({ error: "The project information could not be changed." });
          });
})



//custom middleware
function validateProjectId(req, res, next) {
  projects.get(req.params.id).then(project => {
    if (project) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  });
}

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "missing required name and/or description field" });
  } else {
    console.log(req.body.name);
    next();
  }
}

//export
module.exports = router;
