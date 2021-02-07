import React from "react";
import Card from "./Card";

const games = [
    ['/ticTacToe', 'Крестики-нолики'],
    ['/checkers', 'Шашки'],
    ['/tetris', 'Тетрис']
];

function Cards() {
    return(
        <div className="cards">
            {games.map((game) =>
                <Card link={game[0]} name={game[1]}/>
            )}
        </div>
    )
}

export default Cards;