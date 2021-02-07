import {
    CHECKERS_CHOOSE_CHARACTER, CHECKERS_CHOOSE_NORMAL_CHECKER,
    CHECKERS_KINGS_MOVE, CHECKERS_NORMAL_MOVE,
    CHECKERS_CHOOSE_KINGS_CHECKER, CHECKERS_END_GAME, CHECKERS_CLEARING_BOARD
} from "../actionTypes/checkers";

export function normalMove(row, column) {
    return {
        type: CHECKERS_NORMAL_MOVE,
        row: row,
        column: column
    }
}

export function kingsMove(row, column) {
    return {
        type: CHECKERS_KINGS_MOVE,
        row: row,
        column: column
    }
}

export function chooseCharacter(number, character) {
    return {
        type: CHECKERS_CHOOSE_CHARACTER,
        number: number,
        character: character
    }
}

export function chooseNormalChecker(player, row, column) {
    return {
        type: CHECKERS_CHOOSE_NORMAL_CHECKER,
        player: player,
        row: row,
        column: column
    }
}

export function chooseKingsChecker(player, row, column) {
    return {
        type: CHECKERS_CHOOSE_KINGS_CHECKER,
        player: player,
        row: row,
        column: column
    }
}

export function endGame(winner) {
    return {
        type: CHECKERS_END_GAME,
        winner: winner
    }
}

export function clearingBoard() {
    return {
        type: CHECKERS_CLEARING_BOARD
    }
}