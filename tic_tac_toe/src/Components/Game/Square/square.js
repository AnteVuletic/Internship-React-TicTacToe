import React from 'react';

import './square.css';

const Square = (props) =>{
    return (
    <button onClick={() => props.onSquareClicked(props.indexSquare)} className="square">
        {props.handleVisible ? props.label : ''}
    </button>
    );
}

export default Square;