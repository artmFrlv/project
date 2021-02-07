import React from "react";
import Cell from "./Cell";
import {connect} from "react-redux";

class Board extends React.Component {
    render() {
        return (
            <div className={'board'}>
                {this.props.board.map(array =>
                    array.map(item => <Cell/>)
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        board: state.tetris.board
    }
}

export default connect(mapStateToProps, null)(Board);
