import { tensor, scalar } from '@tensorflow/tfjs';

console.log('this is my index.js');

tensor([[1, 2], [3, 4]]).print();
tensor([1, 2, 3, 4], [2, 2]).print();

scalar(3.14).print();
