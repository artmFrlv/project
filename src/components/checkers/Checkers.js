import React from "react";
import '../../styles/checkers.scss';
import '../../styles/characterSelection.scss'
import CharacterSelection from "./CharacterSelection";
import Game from "./Game";

class Checkers extends React.Component {
    render() {
        return (
                <div className={'checkers'}>
                    <CharacterSelection number={0}/>
                    <Game/>
                    <CharacterSelection number={1}/>
                </div>
        );
    }
}

export default Checkers;