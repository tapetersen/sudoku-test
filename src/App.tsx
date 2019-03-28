import React, {ChangeEvent, Component } from 'react';
import {checkValid, Results} from "./Sudoku";
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



class SudokuBoard extends Component<Readonly<{}>, State> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cells: new Array(81).fill(0),
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

export default App;
