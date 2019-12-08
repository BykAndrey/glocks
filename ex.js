const sum = (inputs, weights) => {
  if (inputs.length !== weights.length) {
    throw Error();
  }
  let output = 0;
  for (let i = 0; i < weights.length; i++) {
    output += inputs[i] * weights[i];
  }
  return output;
};

const ele_mul = (number, vector) => {
  return vector.map(val => number * val);
};

let weight = [0.3, 0.2, 0.9];
let input = [0.65];
let goal = 0.1;
const ALPHA = 0.01;
for (let i = 0; i < 100; i++) {
  let pred = sum(input, weight);
  error = Math.pow(pred - goal, 2);
  let delta = pred - goal;
  let weight_delta = ele_mul(delta, input);
  for (var j = 0; j < weight.length; j++) {
    weight[j] -= weight_delta[j] * ALPHA;
  }
  // weight -= delta;
  console.log(pred);
}
