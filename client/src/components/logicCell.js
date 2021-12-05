//npm install lodash
import { cloneDeep } from "lodash";

const nextFrameGravity=(oldGrid)=>{
    
    var newGrid=cloneDeep(oldGrid) 
    ///aah yes the good old spread for deeps    
    //console.log(Object.keys(newGrid).length)
    //honestly wtf javascript

    for (let row = oldGrid.length-1; row >= 0; row--) {
        for (let col = oldGrid[row].length-1; col >= 0; col--) {

            //for sand particles
            if(oldGrid[row][col]==='S'){
                if(row+1<Object.keys(oldGrid).length){
                    if(newGrid[row+1][col]===0){
                        newGrid[row][col]=0;
                        newGrid[row+1][col]='S';
                    }
                    else{
                        if(col>0 && newGrid[row+1][col-1]===0){
                            newGrid[row][col]=0;
                            newGrid[row+1][col-1]='S'
                        }
                        else{
                            if(col+1<Object.keys(oldGrid[row]).length && newGrid[row+1][col+1]===0){
                                newGrid[row][col]=0;
                                newGrid[row+1][col+1]="S"
                            }
                        }
                    }
                }
            }
            if(oldGrid[row][col]==='W'){
                if(row+1<Object.keys(oldGrid).length){
                    if(newGrid[row+1][col]===0){
                        newGrid[row][col]=0;
                        newGrid[row+1][col]='W';
                    }
                    else{
                        if(col>0 && newGrid[row+1][col-1]===0){
                            newGrid[row][col]=0;
                            newGrid[row+1][col-1]='W'
                        }
                        else{
                            if(col+1<Object.keys(oldGrid[row]).length && newGrid[row+1][col+1]===0){
                                newGrid[row][col]=0;
                                newGrid[row+1][col+1]="W"
                            }
                            else{
                                if(newGrid[row][col-1]===0 && col>0){
                                    newGrid[row][col]=0;
                                    newGrid[row][col-1]="W"
                                }else{
                                    if(newGrid[row][col+1]===0 && col+1<Object.keys(oldGrid[row]).length){
                                        newGrid[row][col]=0;
                                        newGrid[row][col+1]="W"
                                    }
                                }
                            }
                        }
                    }
                }
            }    
        }  
    }
    console.log(newGrid,"test");
    return newGrid;
}
export default nextFrameGravity;