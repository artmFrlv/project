import React from "react";
import Character from "./Character";
import {connect} from "react-redux";
import {chooseCharacter} from "../../store/actionCreators/ticTacToe";

class CharacterSelection extends React.Component {
    choose = (number, character) => {
        this.props.chooseCharacter(number, character);
    };

    render() {
        return (
            <div className={'characterSelection'}>
                <div className={'text'}>
                    Выберите иконку для {this.props.number === 0 ? 'первого' : 'второго'} игрока
                </div>
                <div className={'characters'}>
                    {this.props.characters.map((character) =>
                        <Character character={character} number={this.props.number}
                                   selected={character === this.props.players[this.props.number] ? 'selected' : ''}
                                   choose={(number, character) => this.choose(number, character)}/>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        characters: state.ticTacToe._characters,
        players: state.ticTacToe.players
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseCharacter: (number, character) => dispatch(chooseCharacter(number, character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelection);