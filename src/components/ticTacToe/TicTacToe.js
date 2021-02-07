import React from "react";
import '../../styles/ticTacToe.scss';
import '../../styles/characterSelection.scss'
import Game from "./Game";
import CharacterSelection from "./CharacterSelection";


class TicTacToe extends React.Component {
    render() {
        return (
            <div className={'ticTacToe'}>
                <CharacterSelection number={0}/>
                <Game/>
                <CharacterSelection number={1}/>
            </div>
        );
    }
}

export default TicTacToe;