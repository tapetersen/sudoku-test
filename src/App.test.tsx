import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {checkValid, Results} from "./Sudoku";

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('validates correct solution', () => {
  expect(checkValid(ValidExample)).toEqual(Results.VALID);
});

it('fails example with invalid row', () => {
  expect(checkValid(InValidRowExample)).toEqual(Results.INVALID_ROW);
});

it('fails example with invalid column', () => {
  expect(checkValid(InValidColumnExample)).toEqual(Results.INVALID_COLUMN);
});

it('fails example with invalid square', () => {
  expect(checkValid(InValidSquareExample)).toEqual(Results.INVALID_SQUARE);
});