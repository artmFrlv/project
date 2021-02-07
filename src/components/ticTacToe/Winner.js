import React from 'react';
import {connect} from "react-redux";
import {clearingBoard} from "../../store/actionCreators/ticTacToe";

class Winner extends React.Component{
    render() {
        return (
            <div className="winner">
                <div className={'text'}>
                    {`Winner: ${this.props.winner}`}
                </div>
                <div className={'recycle'} onClick={() => this.props.clearingBoard()}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        winner: state.ticTacToe.winner
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearingBoard: ()=> {dispatch(clearingBoard())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Winner);