

import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import axios from "axios";

import Project from "./Project";


const projectsUrl = "http://localhost:4000/api/projects/";

function ProjectList(props) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      axios.get(projectsUrl).then(response => {
        console.log(response);
        setProjects(response.data);
      });
    }, []);
  

  return (
    <div className="project-list">
        {projects.map(project => (
          <Link to={`projects/${project.id}`} key={project.id}>
            <Project project={project} />
          </Link>
        ))}
      </div>
  );
}

export default ProjectList;
