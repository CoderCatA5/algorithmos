import React from "react";
import Cell from "./Cell";

import nextFrameGravity from "./logicCell";


class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state={
          grid:[
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
        ],
       
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
      this.setState({...this.state,grid:nextFrameGravity(this.state.grid)})
    }

  
    render() {
      var dis_grid=[];
      console.log(this.state.grid)
      for (let row = 0; row < this.state.grid.length; row++) {
        for (let col = 0; col < this.state.grid[row].length; col++) {
          dis_grid.push(<Cell key={[row,col]} type={this.state.grid[row][col]} row={row} col={col} func={this.handleClick} grid={this.state.grid}/>)
        }
        dis_grid.push(<br key={row}/>);
      }
      
      return (
        <div>
          <h1 >CHECK</h1>
          {dis_grid}
        </div>
      );
    }
  }
export default Grid;