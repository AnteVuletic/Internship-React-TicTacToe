import React from 'react';

import './board.css';

import Square from '../Square/square';

const Board = (props) =>{
    const handleCurrentPlayer = () =>{
        return props.history[props.history.length-1].isNextPlayerX ? 'X': 'O';
    }
    const handlePlayerOnIndex = (index) =>{
        return props.history[index].isNextPlayerX ? 'O' : 'X';
    }
    const handleFieldPlayed = (item) =>{
        let indexFound =  props.history.findIndex((historyItem)=>historyItem.movePlayed === item);
        return indexFound;
    }
    const renderSquare = (item,visible, labelOnIndex) => {
      return <Square key={item} handleVisible={visible} indexSquare={item} label={labelOnIndex} onSquareClicked={handleSquareClicked} />;
    }
    const handleSquareClicked = (indexOfClicked) =>{
        props.onMovePlayed(indexOfClicked);
    }

    const BOARD_INDEXES = [[0,1,2],[3,4,5],[6,7,8]];
    const status = `Next player: ${handleCurrentPlayer()}`;
  
    return (
    <div>
        <div className="status">{status}</div>
        {
            BOARD_INDEXES.map((rowItems,rowIndex) =>{
                return (
                <div key={rowIndex} className="board-row">
                    {
                        rowItems.map((itemRow)=>{
                            let indexFound = handleFieldPlayed(itemRow)
                            return indexFound !== -1 ?
                            renderSquare(itemRow,true,handlePlayerOnIndex(indexFound)) :
                            renderSquare(itemRow,false,'')
                        })
                    }
                </div>)
            })
        }
    </div>
    );
}

export default Board;