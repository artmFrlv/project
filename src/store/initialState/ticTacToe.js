const initialState = {
    switchPlayer: true,
    players: ['', ''],
    winner: '',
    gameOver: false,
    gameStarted: false,
    board: ['','','','','','','','',''],
    alert: '',
    _characters: [
        'cow', 'creeper', 'enderman', 'farmer',
        'sheep', 'skeleton', 'spider', 'steve',
        'zombie'
    ]
};

export default initialState;