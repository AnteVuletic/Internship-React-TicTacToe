import React from 'react';

import './game.css';

import Board from './Board/board';

class Game extends React.Component {
    constructor(props){
        super(props);
 
        this.state = {
            viewHistory : 1,
            gameHistory : [
                {
                    isNextPlayerX : null,
                    movePlayed: null
                }
            ]
        }
    }
    handleHistory = (moveIndex) =>{
        if(!this.isLegalMove(moveIndex)) return;
        if(this.checkWin()) return;
        this.state.viewHistory - this.state.gameHistory.length < 0 ? 
        this.handlePlayFromHistory(moveIndex) :
        this.handlePlay(moveIndex);
    }
    isLegalMove = (moveIndex) =>{
        let caseHistoryModifier = this.state.gameHistory.slice(0,this.state.viewHistory);
        let foundIndex = caseHistoryModifier.findIndex((historyItem) => historyItem.movePlayed === moveIndex);
        return foundIndex === -1;
    }
    checkWin = () =>{
        let caseHistoryModifier = this.state.gameHistory.slice(0,this.state.viewHistory);
        let lastPlayerFields = caseHistoryModifier.filter((historyItem)=>
        historyItem.isNextPlayerX === this.state.gameHistory[this.state.gameHistory.length -1].isNextPlayerX);
        let isWin = false;  
        isWin = lastPlayerFields.find((playerField)=>{
            let rowWin = lastPlayerFields.filter((filterPlayer)=> (parseInt(playerField.movePlayed/3) === parseInt(filterPlayer.movePlayed/3)) && -2 < (playerField.movePlayed - filterPlayer.movePlayer%3) < 2);
            if(rowWin.length === 3){
                return true;
            }
            let columnWin = lastPlayerFields.filter((filterPlayer)=> (filterPlayer.movePlayed%3 === playerField.movePlayed%3));
            if( columnWin.length === 3) 
            {
                return true;
            }
            if(playerField.movePlayed === 4){
                let verticalWin = lastPlayerFields.filter((filterPlayer)=> filterPlayer.movePlayed%2 === 0);
                if(verticalWin.length === 3){
                    return true;
                }
            }
        });
        return isWin;
    }
    handlePlayFromHistory = (moveIndex) =>{
        this.setState((previousState)=>{
            let newPreviousHistory = [...previousState.gameHistory.slice(0,this.state.viewHistory)];
            return{
                viewHistory : this.state.viewHistory +1,
                gameHistory : [...newPreviousHistory,{
                    isNextPlayerX : !newPreviousHistory[newPreviousHistory.length -1].isNextPlayerX,
                    movePlayed : moveIndex
                }]
            }
        });
    }
    handlePlay = (moveIndex) =>{
        this.setState((previousState)=>{
            return{
                viewHistory : previousState.viewHistory +1,
                gameHistory : [
                    ...previousState.gameHistory,
                    {
                        isNextPlayerX : !previousState.gameHistory[previousState.gameHistory.length-1].isNextPlayerX,
                        movePlayed: moveIndex
                    }
                ]
            }
        });
    }
    handleViewHistory = (index) =>{
        this.setState({
            viewHistory : index
        });
    }
    handleRenderViewHistory = () =>{
        return this.state.gameHistory.slice(0,this.state.viewHistory);
    }
    render() {
        const { gameHistory } = this.state;
        return (
        <div className="game">
            <div className="game-board">
                <Board history={this.handleRenderViewHistory()} win={this.checkWin()} onMovePlayed={this.handleHistory}/>
            </div>
            <div className="game-info">
            {
                gameHistory.map((historyItem,index)=>
                        <button key={index} onClick={() => this.handleViewHistory(index+1)}>{
                            historyItem.movePlayed === null ? 'Go to game start' : `Go to move #${index}`
                        }</button>
                )
            }
            </div>
        </div>
        );
    }
}

export default Game;