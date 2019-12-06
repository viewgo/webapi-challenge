import React, {useState, useEffect} from 'react';

import axios from "axios";

import Actions from "./Actions";


function ProjectDetails(props) {

    const [project, setProject] = useState({name: "", description: ""});

    useEffect(() => {
        const id = props.match.params.id;
        axios
          .get(`http://localhost:4000/api/projects/${id}`)
          .then(response => {
              console.log("get single project", response.data);
            setProject(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, [props.match.params.id]);

  return (
    <div className="project-details-card">
        <h2>{project.name}</h2>
        <h3>{project.description}</h3>
        <Actions actions={project.actions}/>
    </div>
  );
}

export default ProjectDetails;
