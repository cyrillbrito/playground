import * as tf from '@tensorflow/tfjs';

console.log('this is my index.js');

tf.tensor([[1, 2], [3, 4]]).print();
tf.tensor([1, 2, 3, 4], [2, 2]).print();

tf.scalar(3.14).print();
