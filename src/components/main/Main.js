import React from 'react';
import {Route} from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import Body from "./Body";
import TicTacToe from "../ticTacToe/TicTacToe";
import '../../styles/app.scss';
import Checkers from "../checkers/Checkers";
import Tetris from "../tetris/Tetris";

function Main() {
    return (
        <div className="main">
            <Header/>
            <Route exact path={'/'} component={Body}/>
            <Route exact path={'/ticTacToe'} component={TicTacToe}/>
            <Route exact path={'/checkers'} component={Checkers}/>
            <Route exact path={'/tetris'} component={Tetris}/>
            <Footer/>
        </div>
    );
}

export default Main;
