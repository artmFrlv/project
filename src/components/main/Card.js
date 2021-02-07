import React from "react";
import {NavLink} from "react-router-dom";

function Card(props) {
    return(
        <div className="card">
            <NavLink to={props.link}> {props.name} </NavLink>
        </div>
    )
}

export default Card;