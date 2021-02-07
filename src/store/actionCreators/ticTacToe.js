import {
    CHOOSE_CHARACTER,
    CLEARING_BOARD,
    END_GAME,
    MOVE, TIC_TAC_TOE_CHOOSE_CHARACTER,
    TIC_TAC_TOE_CLEARING_BOARD, TIC_TAC_TOE_END_GAME,
    TIC_TAC_TOE_MOVE
} from "../actionTypes/ticTacToe";

export function move(index) {
    return {
        type: TIC_TAC_TOE_MOVE,
        index: index
    }
}

export function clearingBoard() {
    return {
        type: TIC_TAC_TOE_CLEARING_BOARD
    }
}

export function endGame(winner) {
    return {
        type: TIC_TAC_TOE_END_GAME,
        winner: winner
    }
}

export function chooseCharacter(number, character) {
    return {
        type: TIC_TAC_TOE_CHOOSE_CHARACTER,
        number: number,
        character: character
    }
}