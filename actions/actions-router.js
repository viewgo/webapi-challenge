const express = require("express");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

//actions endpoints
router.get("/", (req, res) => {
  actions
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error on GET /actions", err);
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  actions
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(`error on GET /actions/${req.params.id}`, err);
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

router.post("/", validateAction, (req, res) => {
  actions
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(`error on POST /actions`, err);
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
    actions
      .remove(req.params.id)
      .then(response => {
        res.status(200).json({ message: "Action deleted successfully." });
      })
      .catch(err => {
        console.log(`error on DELETE /actions/${req.params.id}`, err);
        res
          .status(500)
          .json({ error: "The action information could not be deleted." });
      });
  });

//custom middleware
function validateActionId(req, res, next) {
  actions.get(req.params.id).then(action => {
    if (action) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  });
}

function validateAction(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res.status(400).json({
      message: "missing required project_id, description, or notes field"
    });
  } else if(req.body.description.length > 128){
    res.status(400).json({
        message: "description field longer than max of 128 characters."
      });
  }else {
    projects.get(req.body.project_id).then(project => {
      if (!project) {
        res
          .status(404)
          .json({
            message: "The action with the specified ID does not exist."
          });
      } else {
        next();
      }
    });
  }
}

//export
module.exports = router;
