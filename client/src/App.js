import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import Project from "./Project";
import ProjectDetails from "./ProjectDetails";
import ProjectList from "./ProjectList";

import "./App.css";

function App() {
  

  return (
    <div className="App">
      <Route exact path="/" component={ProjectList} />
      <Route
        path="/projects/:id"
        render={props => <ProjectDetails {...props} />}
      />
    </div>
  );
}

export default App;
