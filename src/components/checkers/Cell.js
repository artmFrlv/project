import React from "react";

function Cell(props) {
    return (
        <div className={`cell ${props.selected} ${props.isKing}`} onClick={() => {
            return props.correctAction(props.character, props.row, props.column)
        }}>
            <div className={`color ${props.color}`}>

            </div>
            <div className={`character ${props.character}`}>

            </div>
        </div>
    );
}

export default Cell;