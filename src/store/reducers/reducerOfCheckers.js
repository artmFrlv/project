import initialState from "../initialState/checkers";
import {
    CHECKERS_CHOOSE_CHARACTER, CHECKERS_CHOOSE_KINGS_CHECKER,
    CHECKERS_CHOOSE_NORMAL_CHECKER, CHECKERS_CLEARING_BOARD, CHECKERS_END_GAME,
    CHECKERS_KINGS_MOVE,
    CHECKERS_NORMAL_MOVE
} from "../actionTypes/checkers";

function reducerOfCheckers(checkers = initialState, action) {
    switch (action.type) {
        case CHECKERS_CHOOSE_CHARACTER: {
            const copyPlayers = [...checkers.players];
            const otherPlayer = checkers.players[(action.number + 1) % 2];
            const copyBoard = checkers.board;
            let alert = '';
            let copySwitchPlayer = checkers.switchPlayer;
            if (otherPlayer === action.character)
                alert = 'Нельзя выбирать одинаковых персонажей';

            if (otherPlayer !== action.character && !checkers.gameStarted) {
                copySwitchPlayer = false;
                copyPlayers[action.number] = action.character;
                if (otherPlayer !== '') {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < copyBoard[i].length; j++) {
                            if ((i + j) % 2 === 1) {
                                if (action.number === 1)
                                    copyBoard[i][j] = action.character;
                                else
                                    copyBoard[i][j] = otherPlayer;
                            }
                        }
                    }
                    for (let i = 5; i < 8; i++) {
                        for (let j = 0; j < copyBoard[i].length; j++) {
                            if ((i + j) % 2 === 1) {
                                if (action.number === 0)
                                    copyBoard[i][j] = action.character;
                                else
                                    copyBoard[i][j] = otherPlayer;
                            }
                        }
                    }
                }
            }

            return {...checkers, players: [...copyPlayers], board: [...copyBoard], alert: alert, switchPlayer: copySwitchPlayer};
        }
        case CHECKERS_CHOOSE_NORMAL_CHECKER: {
            let copyChosenChecker = [...checkers.chosenChecker];
            let copyGameStarted = checkers.gameStarted;
            const copyBoard = checkers.board;
            const playerNumber = checkers.switchPlayer ? 1 : 0;
            const otherPlayerNumber = checkers.switchPlayer ? 0 : 1;
            const players = checkers.players;
            const possibleMoves = [];
            const row = action.row;
            const column = action.column;
            let alert;
            if (checkers.gameOver) {
                alert = 'Перезапустите игру'
            }
            if (action.player === players[playerNumber]
                && ((checkers.turnPhase && row === copyChosenChecker[0] && column === copyChosenChecker[1])
                    || !checkers.turnPhase) && !checkers.gameOver) {
                copyChosenChecker = [row, column];
                copyGameStarted = true;

                if (!checkers.turnPhase) {
                    if (playerNumber === 1) {
                        if (row + 1 < 8) {
                            if (column + 1 < 8 && copyBoard[row + 1][column + 1] === '')
                                possibleMoves.push([row + 1, column + 1]);
                            if (column - 1 > -1 && copyBoard[row + 1][column - 1] === '')
                                possibleMoves.push([row + 1, column - 1]);
                        }
                    }

                    if (playerNumber === 0) {
                        if (row - 1 > -1) {
                            if (column + 1 < 8 && copyBoard[row - 1][column + 1] === '') {
                                possibleMoves.push([row - 1, column + 1]);
                            }
                            if (column - 1 > -1 && copyBoard[row - 1][column - 1] === '') {
                                possibleMoves.push([row - 1, column - 1]);
                            }
                        }
                    }
                }

                if (row + 2 < 8) {
                    if (column + 2 < 8 && copyBoard[row + 2][column + 2] === '' && copyBoard[row + 1][column + 1] === players[otherPlayerNumber]) {
                        possibleMoves.push([row + 2, column + 2]);
                    }
                    if (column - 2 > -1 && copyBoard[row + 2][column - 2] === '' && copyBoard[row + 1][column - 1] === players[otherPlayerNumber]) {
                        possibleMoves.push([row + 2, column - 2]);
                    }
                }
                if (row - 2 > -1) {
                    if (column + 2 < 8 && copyBoard[row - 2][column + 2] === '' && copyBoard[row - 1][column + 1] === players[otherPlayerNumber]) {
                        possibleMoves.push([row - 2, column + 2]);
                    }
                    if (column - 2 > -1 && copyBoard[row - 2][column - 2] === '' && copyBoard[row - 1][column - 1] === players[otherPlayerNumber]) {
                        possibleMoves.push([row - 2, column - 2]);
                    }
                }
            }
            return {
                ...checkers,
                chosenChecker: [...copyChosenChecker],
                gameStarted: copyGameStarted,
                possibleMoves: [...possibleMoves],
                alert: alert
            }
        }
        case CHECKERS_NORMAL_MOVE: {
            const copyBoard = checkers.board;
            let copyPossibleMoves = checkers.possibleMoves;
            const row = action.row;
            const column = action.column;
            const playerNumber = checkers.switchPlayer ? 1 : 0;
            const otherPlayerNumber = checkers.switchPlayer ? 0 : 1;
            let copyChosenChecker = checkers.chosenChecker;
            let copySwitchPlayer = checkers.switchPlayer;
            let copyTurnPhase = checkers.turnPhase;
            const players = checkers.players;
            let copyKings = checkers.kings;
            let alert = '';
            let counter = 0;

            for (let i = 0; i < copyPossibleMoves.length; i++) {
                counter++;
                if (row === copyPossibleMoves[i][0] && column === copyPossibleMoves[i][1]) {
                    counter++;
                    copyPossibleMoves = [];
                    copyBoard[row][column] = checkers.players[playerNumber];
                    copyBoard[copyChosenChecker[0]][copyChosenChecker[1]] = '';
                    copySwitchPlayer = !copySwitchPlayer;

                    if (row === 0 && playerNumber === 0) {
                        copyKings.push([row, column]);
                    }
                    if (row === 7 && playerNumber === 1) {
                        copyKings.push([row, column]);
                    }

                    let count = 0;
                    if (Math.abs(row - copyChosenChecker[0]) === 2) {
                        copyBoard[Math.abs(row + copyChosenChecker[0]) / 2][Math.abs(column + copyChosenChecker[1]) / 2] = '';
                        for (let j = 0; j < copyKings.length; j++) {
                            if (copyKings[j][0] === (Math.abs(row + copyChosenChecker[0]) / 2)
                                && copyKings[j][1] === (Math.abs(column + copyChosenChecker[1]) / 2)) {
                                if (j + 1 < copyKings.length) {
                                    copyKings = copyKings.slice(0, j).concat(copyKings.slice(j + 1));
                                } else {
                                    copyKings = copyKings.slice(0, j)
                                }
                            }
                        }
                        if (row + 2 < 8) {
                            if (column + 2 < 8 && copyBoard[row + 2][column + 2] === '' && copyBoard[row + 1][column + 1] === players[otherPlayerNumber]) {
                                count += 1;
                            }
                            if (column - 2 > -1 && copyBoard[row + 2][column - 2] === '' && copyBoard[row + 1][column - 1] === players[otherPlayerNumber]) {
                                count += 1;
                            }
                        }
                        if (row - 2 > -1) {
                            if (column + 2 < 8 && copyBoard[row - 2][column + 2] === '' && copyBoard[row - 1][column + 1] === players[otherPlayerNumber]) {
                                count += 1;
                            }
                            if (column - 2 > -1 && copyBoard[row - 2][column - 2] === '' && copyBoard[row - 1][column - 1] === players[otherPlayerNumber]) {
                                count += 1;
                            }
                        }
                    }
                    if (count > 0) {
                        copySwitchPlayer = !copySwitchPlayer;
                        copyTurnPhase = true;
                        copyChosenChecker = [row, column];
                    } else {
                        copyChosenChecker = [];
                        copyTurnPhase = false;
                    }
                    break;
                }
            }

            if (counter === copyPossibleMoves.length) {
                alert = 'Недопустимый ход';
            }

            return {
                ...checkers,
                board: [...copyBoard],
                possibleMoves: [...copyPossibleMoves],
                chosenChecker: [...copyChosenChecker],
                switchPlayer: copySwitchPlayer,
                kings: [...copyKings],
                turnPhase: copyTurnPhase,
                alert: alert
            }
        }
        case CHECKERS_KINGS_MOVE: {
            const copyBoard = checkers.board;
            let copyPossibleMoves = checkers.possibleMoves;
            const row = action.row;
            const players = checkers.players;
            let copyTurnPhase = checkers.turnPhase;
            const column = action.column;
            const playerNumber = checkers.switchPlayer ? 1 : 0;
            const otherPlayerNumber = checkers.switchPlayer ? 0 : 1;
            let copyChosenChecker = checkers.chosenChecker;
            let copySwitchPlayer = checkers.switchPlayer;
            const rowChosenChecker = copyChosenChecker[0];
            const columnChosenChecker = copyChosenChecker[1];
            let copyKings = checkers.kings;
            let alert = '';
            let counter = 0;

            for (let i = 0; i < copyPossibleMoves.length; i++) {
                counter++;
                if (copyPossibleMoves[i][0] === row && copyPossibleMoves[i][1] === column) {
                    counter++;
                    copyPossibleMoves = [];
                    copyChosenChecker = [];
                    copyBoard[row][column] = checkers.players[playerNumber];
                    copyBoard[rowChosenChecker][columnChosenChecker] = '';
                    copySwitchPlayer = !copySwitchPlayer;
                    let isEaten = false;
                    for (let i = 0; i < copyKings.length; i++) {
                        if (copyKings[i][0] === rowChosenChecker && copyKings[i][1] === columnChosenChecker) {
                            copyKings[i] = [row, column];
                        }
                    }

                    for (let i = 1; i < Math.abs(row - rowChosenChecker); i++) {
                        if (row > rowChosenChecker && column > columnChosenChecker) {
                            if (copyBoard[rowChosenChecker + i][columnChosenChecker + i] === players[otherPlayerNumber]) {
                                for (let j = 0; j < copyKings.length; j++) {
                                    if (copyKings[j][0] === rowChosenChecker + i && copyKings[j][1] === columnChosenChecker) {
                                        copyKings = copyKings.slice(0, j).concat(copyKings.slice(j + 1));
                                    }
                                }
                                isEaten = true;
                                copyBoard[rowChosenChecker + i][columnChosenChecker + i] = '';
                                break;
                            }
                        }
                        if (row < rowChosenChecker && column < columnChosenChecker) {
                            if (copyBoard[rowChosenChecker - i][columnChosenChecker - i] === players[otherPlayerNumber]) {
                                for (let j = 0; j < copyKings.length; j++) {
                                    if (copyKings[j][0] === rowChosenChecker + i && copyKings[j][1] === columnChosenChecker) {
                                        copyKings = copyKings.slice(0, j).concat(copyKings.slice(j + 1));
                                    }
                                }
                                isEaten = true;
                                copyBoard[rowChosenChecker - i][columnChosenChecker - i] = '';
                                break;
                            }
                        }
                        if (row > rowChosenChecker && column < columnChosenChecker) {
                            if (copyBoard[rowChosenChecker + i][columnChosenChecker - i] === players[otherPlayerNumber]) {
                                for (let j = 0; j < copyKings.length; j++) {
                                    if (copyKings[j][0] === rowChosenChecker + i && copyKings[j][1] === columnChosenChecker) {
                                        copyKings = copyKings.slice(0, j).concat(copyKings.slice(j + 1));
                                    }
                                }
                                isEaten = true;
                                copyBoard[rowChosenChecker + i][columnChosenChecker - i] = '';
                                break;
                            }
                        }
                        if (row < rowChosenChecker && column > columnChosenChecker) {
                            if (copyBoard[rowChosenChecker - i][columnChosenChecker + i] === players[otherPlayerNumber]) {
                                for (let j = 0; j < copyKings.length; j++) {
                                    if (copyKings[j][0] === rowChosenChecker + i && copyKings[j][1] === columnChosenChecker) {
                                        copyKings = copyKings.slice(0, j).concat(copyKings.slice(j + 1));
                                    }
                                }
                                isEaten = true;
                                copyBoard[rowChosenChecker - i][columnChosenChecker + i] = '';
                                break;
                            }
                        }
                    }

                    if (isEaten) {
                        let count = 0;
                        let counterRow = row;
                        let counterColumn = column;
                        while (counterRow + 1 < 8 && counterColumn + 1 < 8) {
                            counterRow += 1;
                            counterColumn += 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                if (counterRow + 1 < 8 && counterColumn + 1 < 8
                                    && copyBoard[counterRow + 1][counterColumn + 1] === '') {
                                    count++;
                                    break;
                                }
                            }
                        }
                        counterRow = row;
                        counterColumn = column;
                        while (counterRow - 1 > -1 && counterColumn - 1 > -1) {
                            counterRow -= 1;
                            counterColumn -= 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                if (counterRow - 1 > -1 && counterColumn - 1 > -1
                                    && copyBoard[counterRow - 1][counterColumn - 1] === '') {
                                    count++;
                                    break;
                                }
                            }
                        }
                        counterRow = row;
                        counterColumn = column;
                        while (counterRow + 1 < 8 && counterColumn - 1 > -1) {
                            counterRow += 1;
                            counterColumn -= 1;
                            if (counterRow + 1 < 8 && counterColumn - 1 > -1
                                && copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                if (copyBoard[counterRow + 1][counterColumn - 1] === '') {
                                    count++;
                                    break;
                                }
                            }
                        }
                        counterRow = row;
                        counterColumn = column;
                        while (counterRow - 1 > -1 && counterColumn + 1 < 8) {
                            counterRow -= 1;
                            counterColumn += 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                if (counterRow - 1 > -1 && counterColumn + 1 < 8
                                    && copyBoard[counterRow - 1][counterColumn + 1] === '') {
                                    count++;
                                    break;
                                }
                            }
                        }

                        if (count > 0) {
                            copySwitchPlayer = !copySwitchPlayer;
                            copyTurnPhase = true;
                            copyChosenChecker = [row, column];
                        } else {
                            copyChosenChecker = [];
                            copyTurnPhase = false;
                        }
                    }
                    break;
                }
            }

            if (counter === copyPossibleMoves.length) {
                alert = 'Недопустимый ход';
            }

            return {
                ...checkers,
                board: [...copyBoard],
                possibleMoves: [...copyPossibleMoves],
                chosenChecker: [...copyChosenChecker],
                switchPlayer: copySwitchPlayer,
                turnPhase: copyTurnPhase,
                alert: alert
            }
        }
        case CHECKERS_CHOOSE_KINGS_CHECKER: {
            let copyChosenChecker = [...checkers.chosenChecker];
            const copyBoard = checkers.board;
            const playerNumber = checkers.switchPlayer ? 1 : 0;
            const players = checkers.players;
            const possibleMoves = [];
            const otherPlayerNumber = checkers.switchPlayer ? 0 : 1;
            const row = action.row;
            const column = action.column;
            let alert;
            if (checkers.gameOver) {
                alert = 'Перезапустите игру'
            }
            if (action.player === players[playerNumber]
                && ((checkers.turnPhase && row === copyChosenChecker[0] && column === copyChosenChecker[1])
                    || !checkers.turnPhase) && !checkers.gameOver) {
                copyChosenChecker = [row, column];
                let counterRow = row;
                let counterColumn = column;
                if (!checkers.turnPhase) {
                    while (counterRow + 1 < 8 && counterColumn + 1 < 8) {
                        counterRow += 1;
                        counterColumn += 1;
                        if (copyBoard[counterRow][counterColumn] === '') {
                            possibleMoves.push([counterRow, counterColumn]);
                        } else {
                            break;
                        }
                    }
                    counterRow = row;
                    counterColumn = column;
                    while (counterRow - 1 > -1 && counterColumn - 1 > -1) {
                        counterRow -= 1;
                        counterColumn -= 1;
                        if (copyBoard[counterRow][counterColumn] === '') {
                            possibleMoves.push([counterRow, counterColumn]);
                        } else {
                            break;
                        }
                    }
                    counterRow = row;
                    counterColumn = column;
                    while (counterRow + 1 < 8 && counterColumn - 1 > -1) {
                        counterRow += 1;
                        counterColumn -= 1;
                        if (copyBoard[counterRow][counterColumn] === '') {
                            possibleMoves.push([counterRow, counterColumn]);
                        } else {
                            break;
                        }
                    }
                    counterRow = row;
                    counterColumn = column;
                    while (counterRow - 1 > -1 && counterColumn + 1 < 8) {
                        counterRow -= 1;
                        counterColumn += 1;
                        if (copyBoard[counterRow][counterColumn] === '') {
                            possibleMoves.push([counterRow, counterColumn]);
                        } else {
                            break;
                        }
                    }
                }
                counterRow = row;
                counterColumn = column;
                while (counterRow + 1 < 8 && counterColumn + 1 < 8) {
                    counterRow += 1;
                    counterColumn += 1;
                    if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                        while (counterRow + 1 < 8 && counterColumn + 1 < 8) {
                            counterRow += 1;
                            counterColumn += 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]
                                || copyBoard[counterRow][counterColumn] === players[playerNumber]) {
                                break;
                            }
                            possibleMoves.push([counterRow, counterColumn]);
                        }
                        break;
                    }
                }
                counterRow = row;
                counterColumn = column;
                while (counterRow - 1 > -1 && counterColumn - 1 > -1) {
                    counterRow -= 1;
                    counterColumn -= 1;
                    if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                        while (counterRow - 1 > -1 && counterColumn - 1 > -1) {
                            counterRow -= 1;
                            counterColumn -= 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                break;
                            }
                            possibleMoves.push([counterRow, counterColumn]);
                        }
                        break;
                    }
                }
                counterRow = row;
                counterColumn = column;
                while (counterRow + 1 < 8 && counterColumn - 1 > -1) {
                    counterRow += 1;
                    counterColumn -= 1;
                    if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                        while (counterRow + 1 < 8 && counterColumn - 1 > -1) {
                            counterRow += 1;
                            counterColumn -= 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                break;
                            }
                            possibleMoves.push([counterRow, counterColumn]);
                        }
                        break;
                    }
                }
                counterRow = row;
                counterColumn = column;
                while (counterRow - 1 > -1 && counterColumn + 1 < 8) {
                    counterRow -= 1;
                    counterColumn += 1;
                    if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                        while (counterRow - 1 > -1 && counterColumn + 1 < 8) {
                            counterRow -= 1;
                            counterColumn += 1;
                            if (copyBoard[counterRow][counterColumn] === players[otherPlayerNumber]) {
                                break;
                            }
                            possibleMoves.push([counterRow, counterColumn]);
                        }
                        break;
                    }
                }
            }

            return {
                ...checkers,
                chosenChecker: [...copyChosenChecker],
                possibleMoves: [...possibleMoves],
                alert: alert
            }
        }
        case CHECKERS_END_GAME: return {...checkers, gameOver: true, gameStarted: false, winner: action.winner};
        case CHECKERS_CLEARING_BOARD: {
            const copyBoard = checkers.board;
            for (let i = 0; i < copyBoard.length; i++) {
                for (let j = 0; j < copyBoard[i].length; j++) {
                    copyBoard[i][j] = '';
                }
            }
            return {...checkers, board: [...copyBoard], gameOver: false, players: ['', ''], gameStarted: false, kings: []};
        }
        default:
            return checkers
    }
}

export default reducerOfCheckers;