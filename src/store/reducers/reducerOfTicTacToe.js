import {
    TIC_TAC_TOE_CHOOSE_CHARACTER, TIC_TAC_TOE_CLEARING_BOARD,
    TIC_TAC_TOE_END_GAME, TIC_TAC_TOE_MOVE
} from "../actionTypes/ticTacToe";
import initialState from "../initialState/ticTacToe"

function ticTacToe (state = initialState, action) {
    switch(action.type) {
        case TIC_TAC_TOE_MOVE: {
            const copyBoard = [...state.board];
            let copyGameStarted;
            let nextPlayer = state.switchPlayer;
            let alert;

            if (state.players[0] === '' || state.players[1] === '')
                alert = 'Выберите персонажей';
            if (state.gameOver) {
                alert = 'Перезапустите игру'
            }

            if (copyBoard[action.index] === '' && !state.gameOver && state.players[0] !== '' && state.players[1] !== '') {
                copyBoard[action.index] = state.switchPlayer ? state.players[0] : state.players[1];
                nextPlayer = state.switchPlayer !== true;
                copyGameStarted = true;
            }
            return {...state, board: copyBoard, switchPlayer: nextPlayer, gameStarted: copyGameStarted, alert: alert};
        }
        case TIC_TAC_TOE_CLEARING_BOARD: {
            return {...state, board: state.board.map(value => ''), gameOver: false};
        }
        case TIC_TAC_TOE_END_GAME: return {...state, gameOver: true, gameStarted: false, winner: action.winner};
        case TIC_TAC_TOE_CHOOSE_CHARACTER: {
            const copyPlayers = [...state.players];
            const otherPlayer = state.players[(action.number + 1) % 2];
            let alert = state.alert;

            if (otherPlayer === action.character)
                alert = 'Нельзя выбирать одинаковых персонажей';

            if (otherPlayer !== action.character && !state.gameStarted) {
                copyPlayers[action.number] = action.character;
            }
            return {...state, players: [...copyPlayers], alert: alert};
        }

        default: return state;
    }
}

export default ticTacToe;