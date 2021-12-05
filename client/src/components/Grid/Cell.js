import React from "react";
import red from "./svg/red.svg";
import black from "./svg/black.svg"
import sand from "./svg/sand.png"
import trans from "./svg/trans.png"

const Cell =(props)=>{
    var src=trans;

    if(props.type==='S')src=sand;
    
    const handleClick=()=>{
        const grid=props.grid;
        grid[props.row][props.col]='S';
        props.func(grid);
    }

    return(
        <img onClick={handleClick} src={src} alt={src} height="50vw" width="50vw"></img>
    ) 
}

export default Cell;
