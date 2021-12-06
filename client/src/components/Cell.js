import React from "react";

import red from "./svg/red.svg";
import black from "./svg/black.svg"
import sand from "./svg/sand.svg"
import trans from "./svg/trans.png"
import water from "./svg/water.svg"

const Cell =(props)=>{
    var src=trans;

    if(props.type==='S')src=sand;
    if(props.type==='W')src=water;
    
    const handleClick=()=>{
        const grid=props.grid;
        grid[props.row][props.col]='W';
        props.func(grid);
    }

    return(
        <img onClick={handleClick} src={src} alt={src} height="50vw" width="50vw"></img>
    ) 
}

export default Cell;
