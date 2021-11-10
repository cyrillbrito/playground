import React, { Component } from 'react';
import { Board } from '../Board/Board';

export class RainyColors extends Component {

  private board: number[][] = [];

  private drops: { row: number, col: number }[] = [];

  private nRows: number = 0;
  private nCols: number = 0;

  private wrapperRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {

    const width = this.wrapperRef.current.clientWidth;
    const height = this.wrapperRef.current.clientHeight;

    this.nRows = Math.round(height / 30);
    this.nCols = Math.round(width / 30);

    for (let row = 0; row < this.nRows; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.nCols; col++) {
        this.board[row][col] = 0;
      }
    }

    let dCol = 0;
    for (let col = 0; col < this.nCols; col += 10) {
      this.drops.push({ row: 0, col: dCol });
      dCol += 10;
    }
  }




  private functick = () => {

    for (const drop of this.drops) {
      drop.row = (drop.row + Math.floor(Math.random() * 2)) % this.nRows;
      drop.col = (drop.col + Math.floor(Math.random() * 2)) % this.nCols;
      this.board[drop.row][drop.col] = (this.board[drop.row][drop.col] + 50) % 360;
    }

    return this.board;
  };

  render() {
    return (
      <div style={{ height: '100%' }} ref={this.wrapperRef} >
        <Board tick={this.functick}></Board>
      </div>
    );
  }
}
