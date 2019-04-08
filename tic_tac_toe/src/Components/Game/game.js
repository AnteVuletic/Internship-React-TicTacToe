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
                    isCurrentPlayerX : true,
                    movePlayed: null
                }
            ]
        }
    }
    handleHistory = (moveIndex) =>{
        this.setState((previousState)=>{
            return{
                viewHistory : previousState.viewHistory +1,
                gameHistory : [
                    ...previousState.gameHistory,
                    {
                        isCurrentPlayerX : !previousState.gameHistory[previousState.gameHistory.length-1].isCurrentPlayerX,
                        movePlayed: moveIndex
                    }
                ]
            }
        })
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
                <Board history={this.handleRenderViewHistory()} onMovePlayed={this.handleHistory}/>
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