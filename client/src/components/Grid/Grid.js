import React from "react";
import Cell from "./Cell";

import nextFrameGravity from "./logicCell";
const d_grid=[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]


class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state={
          grid:d_grid,
        history:["1","2"],
        inUse:0,
       
      }
    }
    
    componentDidMount(){
      this.timerID=setInterval(
        ()=>this.tick(),
        100
      );
    }
    componentWillUnmount(){
      clearInterval(this.timerID)
    }

    handleClick = (grid) => {
      // Use updater function when new state is derived from old
      this.setState({...this.state,grid:grid});
    };


    tick(){
      const history=this.state.history;
      //if history grid same as previous dont update
      if(history[history.length-1]!==this.state.grid){
        history.push(this.state.grid)
        this.setState({...this.state,grid:nextFrameGravity(this.state.grid),history:history})
      }
    }

  
    render() {
      var dis_grid=[];
      //console.log("CHECK")
      for (let row = 0; row < this.state.grid.length; row++) {
        for (let col = 0; col < this.state.grid[row].length; col++) {
          dis_grid.push(<Cell inUse={this.state.inuse} key={[row,col]} type={this.state.grid[row][col]} row={row} col={col} func={this.handleClick} grid={this.state.grid}/>)
        }
        dis_grid.push(<br key={row}/>);
      }
      
      return (
        <div style={{border:"4px solid"}}>
          {dis_grid}
        </div>
      );
    }
  }

export default Grid;