import React from "react";
import Board from "./Board";
import Winner from "./Winner";
import Alert from "./Alert";


function Game() {
    return (
        <div className={'game'}>
            <Winner/>
            <Board/>
            <Alert/>
        </div>
    );
}

export default Game;