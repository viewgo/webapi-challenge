import React, {useState, useEffect} from 'react';

import axios from "axios";


function Project(props) {

  

  return (
    <div className="project-card">
        <h2>{props.project.name}</h2>
        <h3>{props.project.description}</h3>
    </div>
  );
}

export default Project;
