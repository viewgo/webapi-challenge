import React, {useState, useEffect} from 'react';

import axios from "axios";


function Actions(props) {


    console.log(props.actions);
    

    if(props.actions ){
  return (
    <div className="actions-list">
        {props.actions.map(action => (
            <div key={action.id} className="actions-list">
            <h4>○ {action.description}</h4>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{action.notes}</span>
            </div>
        ))}
    </div>
  );
        } else {
            return <p>Loading</p>
        }
}

export default Actions;
