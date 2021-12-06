
import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";

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

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveSubmission = this.saveSubmission.bind(this);
        this.newSubmission = this.newSubmission.bind(this);
        
        this.state={
          grid:d_grid,
        history:["1"],
        inUse:0,

        id: null,
        title: "",
        description: "", 
        published: false,
        submitted: false
       
      }
    }

    onChangeTitle(e) {
      this.setState({
        title: e.target.value
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }
  
    saveSubmission() {
      var data = {
        title: this.state.title,
        description: this.state.description,
        history:JSON.stringify(this.state.history)
      };
  
      SubmissionDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published,
  
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    newSubmission() {
      this.setState({
        grid:d_grid,
      history:["1"],
      inUse:0,

      id: null,
      title: "",
      description: "", 
      published: false,
      submitted: false
      });
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
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newSubmission}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <button onClick={this.saveSubmission} className="btn btn-success">
                Submit
              </button>
              {dis_grid}
            </div>
          )}
        </div>
      );
    }
  }

export default Grid;