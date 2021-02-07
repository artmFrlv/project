import React from "react";

function Character(props) {
    return (
        <div className={`character ${props.character} ${props.selected}`}
             onClick={() => props.choose(props.number, props.character)}>
        </div>
    );
}

export default Character;