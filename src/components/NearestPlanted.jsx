import React from "react";
import '../styles.css'

function NearestPlanted(props) {
    return  <div className="box">
    <h2>{props.name} </h2>
    <p>{props.distance} kms </p>
    </div>
}

export default NearestPlanted;