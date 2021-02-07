const initialState = {
    switchPlayer: false,
    players: ['', ''],
    winner: '',
    gameOver: false,
    gameStarted: false,
    alert: '',
    turnPhase: false,
    possibleMoves: [],
    chosenChecker: [],
    kings: [],
    board: [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ],
    _characters: [
        'cow', 'creeper', 'enderman', 'farmer',
        'sheep', 'skeleton', 'spider', 'steve',
        'zombie'
    ]
};

export default initialState;