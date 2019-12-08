/** */
const pow = Math.pow;
const log = console.log;
/** */

const sum = (inputs, weights) => {
  // log(inputs,weights)
  if (inputs.length !== weights.length) {
    throw Error();
  }
  let output = 0;
  for (let i = 0; i < weights.length; i++) {
    output += inputs[i] * weights[i];
  }
  // console.log("sum", output);
  return output;
};
const el_vector = (numb, vector) => vector.map(val => val * numb);
const matrix = (inputs, matrix) => {
  let output = [];
  for (let i = 0; i < matrix.length; i++) {
    output.push(sum(inputs, matrix[i]));
  }
  return output;
};
const newral_net = (inputs, weights) => matrix(inputs, weights);

const ALPHA = 0.01; /*
let weights = [
  [0.1, 0.1, -0.3],
  [0.1, 0.2, 0],
  [0, 1.3, 0.1]
];
let inputs = [8.5, 65, 1.2];
let goal = [0.1, 1, 0.1];*/

let weights = [
  [0.1, 0.1, -0.3],
  [0.1, 0.2, 0],
  [0, 1.3, 0.1]
];
let inputs = [8.5, 0.65, 1.2];
let goal = [0.1, 1, 0.1];
function main() {
  // log('===========')
  let pred = newral_net(inputs, weights);
  // log("Pred", pred);
  let errors = [];
  let delta = [];
  for (let i = 0; i < pred.length; i++) {
    errors.push(pow(pred[i] - goal[i], 2));
    delta.push(pred[i] - goal[i]);
  }
  // log("errors", errors);
  // log("delta", delta);

  let weight_delta = [];
  for (var i = 0; i < inputs.length; i++) {
    for (var j = 0; j < delta.length; j++) {
      if (!weight_delta[i]) {
        weight_delta[i] = [];
      }
      weight_delta[i][j] = inputs[i] * delta[j];
    }
  }
  // log("weight_delta", weight_delta);

  /**Correnct weights */

  for (var i = 0; i < weights.length; i++) {
    for (var j = 0; j < weights[i].length; j++) {
      weights[i][j] -= weight_delta[j][i] * ALPHA;
    }
  }
  // log('weights', weights)
  return pred;
}
for (var i = 0; i < 1505; i++) {
  main();
}
log(main());
