import React, { Component } from 'react';
import './Board.css';

interface BoardProps {
  // width: number;
  // // height: number;
  // board: number[][];
  tick: () => number[][];
}

interface BoardState {
  board: number[][];
}

export class Board extends Component<BoardProps, BoardState> {

  componentDidMount() {
    setInterval(() => {
      this.setState({ board: this.props.tick() });
    }, 1);
  }

  render() {

    if (!this.state?.board) {
      return <div>No board</div>;
    }

    const lines: JSX.Element[] = [];
    for (const line of this.state.board) {
      const cells: JSX.Element[] = [];
      for (const cell of line) {
        cells.push(<div className="cell" style={{ backgroundColor: "hsl(" + cell + ",75%,75%)" }}></div>);
      }
      lines.push(<div className="line">{cells}</div>);
    }

    return (
      <div className="board">
        {lines}
      </div>
    );
  }
}
