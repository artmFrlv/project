import React from "react";
import Board from "./Board";
import "../../styles/tetris.scss";

class Tetris extends React.Component {
    render() {
        return (
            <div className={'tetris'}>
                <Board/>
            </div>
        )
    }
}

export default Tetris;