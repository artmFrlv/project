import React from "react";
import Cell from "./Cell";
import {connect} from "react-redux";
import {
    chooseKingsChecker,
    chooseNormalChecker,
    endGame,
    kingsMove,
    normalMove
} from "../../store/actionCreators/checkers";

class Board extends React.Component {
    correctAction = (player, row, column) => {
        let isKing = false;
        for (let i = 0; i < this.props.kings.length; i++) {
            if ((this.props.kings[i][0] === this.props.chosenChecker[0] && this.props.kings[i][1] === this.props.chosenChecker[1]) ||
                (this.props.kings[i][0] === row && this.props.kings[i][1] === column))
                isKing = true;
        }
        const gamerNumber = this.props.switchPlayer ? 1 : 0;
        const gamer = this.props.players[gamerNumber];

        if (player === '') {
            if (isKing) {
                if (this.props.turnPhase) {
                    this.props.chooseKingsChecker(gamer, this.props.chosenChecker[0], this.props.chosenChecker[1]);
                }
                this.props.kingsMove(row, column);
                return;
            }
            if (this.props.turnPhase) {
                this.props.chooseNormalChecker(gamer, this.props.chosenChecker[0], this.props.chosenChecker[1]);
            }
            this.props.normalMove(row, column);
            return;
        }

        if (isKing) {
            this.props.chooseKingsChecker(player, row, column);
            return;
        }
        this.props.chooseNormalChecker(player, row, column);
    };

    checkBoard = () => {
        if (this.props.gameStarted) {
            const board = this.props.board;
            const firstPlayer = this.props.players[this.props.switchPlayer ? 1 : 0];
            const secondPlayer = this.props.players[this.props.switchPlayer ? 0 : 1];
            let firstPlayerCounter = 0;
            let secondPlayerCounter = 0;

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === firstPlayer) {
                        firstPlayerCounter += 1;
                    }
                    if (board[i][j] === secondPlayer) {
                        secondPlayerCounter += 1;
                    }
                }
            }
            if (firstPlayerCounter === 0 && secondPlayerCounter !== 0) {
                this.props.endGame(secondPlayer);
            }
            if (secondPlayerCounter === 0 && firstPlayerCounter !== 0) {
                this.props.endGame(firstPlayer);
            }
        }
    };

    select = (row, column) => {
        return (row === this.props.chosenChecker[0] && column === this.props.chosenChecker[1]) ? 'selected' : '';
    };

    render() {
        this.checkBoard();
        return (
            <div className={'board'}>
                {this.props.board.map((array, row) =>
                    array.map((character, column) => {
                        let isKing = '';
                        let color = '';
                        for (let i = 0; i < this.props.kings.length; i++) {
                            if (this.props.kings[i][0] === row && this.props.kings[i][1] === column)
                                isKing = 'king';
                        }
                        if ((row + column) % 2) {
                            color = 'brown';
                        } else {
                            color = 'white';
                        }
                        return <Cell character={character} row={row} column={column}
                                     isKing = {isKing} color={color}
                                     selected={this.select(row, column)}
                                     correctAction={(player, row, column) => this.correctAction(player, row, column)}/>
                    })
                )}
            </div>
        );
    }
}

function mapPropsToState(state) {
    return {
        board: state.checkers.board,
        players: state.checkers.players,
        switchPlayer: state.checkers.switchPlayer,
        chosenChecker: state.checkers.chosenChecker,
        kings: state.checkers.kings,
        turnPhase: state.checkers.turnPhase,
        gameStarted: state.checkers.gameStarted
    }
}

function mapDispatchToState(dispatch) {
    return {
        chooseNormalChecker: (player, row, column) => dispatch(chooseNormalChecker(player, row, column)),
        normalMove: (row, column) => dispatch(normalMove(row, column)),
        kingsMove: (row, column) => dispatch(kingsMove(row, column)),
        chooseKingsChecker: (player, row, column) => dispatch(chooseKingsChecker(player, row, column)),
        endGame: (winner) => dispatch(endGame(winner))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Board);