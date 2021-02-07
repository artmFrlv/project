import React from "react";
import Square from "./Square";
import {connect} from "react-redux";
import {endGame, move} from "../../store/actionCreators/ticTacToe";

class Board extends React.Component {

    checkBoard(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.props.endGame(board[a]);
            }
        }
        let count = 9;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '')
                count--;
        }
        if (count === 9) {
            this.props.endGame('ничья');
        }
    }

    move = (index) => {
        this.props.move(index);
    };

    render() {
        this.checkBoard(this.props.board);
        return (
            <div className={'board'}>
                {this.props.board.map((value, index) =>
                    <Square value={value} index={index}
                            move={(index) => this.move(index)}/>)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.ticTacToe.board
    }
}

function mapDispatchToProps(dispatch) {
    return {
        endGame: (winner) => dispatch(endGame(winner)),
        move: (index) => dispatch(move(index))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);