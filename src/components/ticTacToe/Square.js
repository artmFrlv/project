import React from "react";

function Square(props) {
    return (
        <div className={`square ${props.value}`} onClick={() => props.move(props.index)}>
        </div>
    );
}

export default Square;