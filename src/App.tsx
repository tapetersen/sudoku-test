import React, {ChangeEvent, Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <SudokuBoard />
        </header>
      </div>
    );
  }
}

interface State {
    cells: number[],
}

const ValidExample = [
    [8,3,5,4,1,6,9,2,7],
    [2,9,6,8,5,7,4,3,1],
    [4,1,7,2,9,3,6,5,8],
    [5,6,9,1,3,4,7,8,2],
    [1,2,3,6,7,8,5,4,9],
    [7,4,8,5,2,9,1,6,3],
    [6,5,2,7,8,1,3,9,4],
    [9,8,1,3,4,5,2,7,6],
    [3,7,4,9,6,2,8,1,5]
].flat();

const InValidRowExample = [
    [2,3,5,4,1,6,9,2,7],
    [8,9,6,8,5,7,4,3,1],
    [4,1,7,2,9,3,6,5,8],
    [5,6,9,1,3,4,7,8,2],
    [1,2,3,6,7,8,5,4,9],
    [7,4,8,5,2,9,1,6,3],
    [6,5,2,7,8,1,3,9,4],
    [9,8,1,3,4,5,2,7,6],
    [3,7,4,9,6,2,8,1,5]
].flat();

const InValidColumnExample = [
    [3,8,5,4,1,6,9,2,7],
    [2,9,6,8,5,7,4,3,1],
    [4,1,7,2,9,3,6,5,8],
    [5,6,9,1,3,4,7,8,2],
    [1,2,3,6,7,8,5,4,9],
    [7,4,8,5,2,9,1,6,3],
    [6,5,2,7,8,1,3,9,4],
    [9,8,1,3,4,5,2,7,6],
    [3,7,4,9,6,2,8,1,5]
].flat();

const InValidSquareExample = [
    [8,3,4,5,1,6,9,2,7],
    [2,9,8,6,5,7,4,3,1],
    [4,1,2,7,9,3,6,5,8],
    [5,6,1,9,3,4,7,8,2],
    [1,2,6,3,7,8,5,4,9],
    [7,4,5,8,2,9,1,6,3],
    [6,5,7,2,8,1,3,9,4],
    [9,8,3,1,4,5,2,7,6],
    [3,7,9,4,6,2,8,1,5]
].flat();

class SudokuBoard extends Component<Readonly<{}>, State> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cells: ValidExample,
        }
    }

    onCellChange(e: ChangeEvent, i:number) {
        const newCells = this.state.cells.slice();
        newCells[i] = parseInt((e.target as HTMLInputElement).value) || 0;
        this.setState({
            cells: newCells
        });
    }

    render() {
        const valid = checkValid(this.state.cells) === Results.VALID;
        console.log(Results[checkValid(this.state.cells)]);
        return (
            <div>
                <div className="sudoku-grid">
                    { this.state.cells.map((v, i) =>
                        <input onChange={(e) => this.onCellChange(e, i)} type="text" key={i} value={v} />) }
                </div>
                <p>{  valid ? 'Valid solution' : 'Invalid solution' }</p>
            </div>
        )
    }
}

enum Results {
    INVALID_ROW,
    INVALID_COLUMN,
    INVALID_SQUARE,
    VALID,
}

function checkValid(board: number[]) {
    const rowSet = new Set();
    const colSet = new Set();
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            rowSet.add(board[i*9 + j]);
            colSet.add(board[j*9 + i]);
        }
        if (rowSet.size != 9) {
            return Results.INVALID_ROW;
        }
        if (colSet.size != 9) {
            return Results.INVALID_COLUMN;
        }
        colSet.clear();
        rowSet.clear();
    }

    const subSquareSet = new Set();
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    subSquareSet.add(board[i*3*9 + j*3 + k*9 + l])
                }
            }
            if (subSquareSet.size != 9) {
                return Results.INVALID_SQUARE;
            }
            subSquareSet.clear();
        }
    }
    return Results.VALID;
}
export default App;
