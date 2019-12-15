const mathjs = require('mathjs');

/** */
const sum = (inputs, weights) => {
	if (inputs.length !== weights.length) return false;
	let output = 0;
	for (let i = 0; i < inputs.length; i++) {
		output += inputs[i] * weights[i];
	}
	return output;
};
const vector_matrix = (inputs, weights) => {
	let output = [];
	for (let i = 0; i < weights.length; i++) {
		output.push(sum(inputs, weights[i]));
	}
	return output;
};
const neural = (inputs, weights) => {
	return vector_matrix(inputs, weights);
};
/** */

let weights = [
	[0.1, 0.1, 0.1],
	[0.1, 0.1, 0.1],
	[0.1, 0.1, 0.1]
];
let weights_1_2 = [[0.1, 0.1, 0.1]];
const inputs = [
	[1, 0, 1],
	[0, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
	[0, 1, 1],
	[1, 0, 1]
];
const goals = [0, 1, 0, 1, 1, 0];
const alpha = 0.01;
const teach = () => {
	for (let i = 0; i < inputs.length; i++) {
		const inputOne = inputs[i];
		const layer_1 = neural(inputOne, weights);
		const layer_2 = neural(layer_1, weights_1_2);

		// console.log(layer_2);
		const layer_2_delta = layer_2 - goals[i];
		const layer_1_delta = weights_1_2.map(val => {
			return layer_2_delta * val;
		});
		// console.log(layer_2_delta);
		weights_1_2 = weights_1_2.map(weight => {
			let output = [];
			for (var j = 0; j < weight.length; j++) {
				output.push(weight[j] * layer_2_delta);
			}
			return output;
		});
		console.log(weights_1_2);
		weights = weights.map(weight => {
			let output = [];
			for (var j = 0; j < weight.length; j++) {
				output.push(weight[j] * layer_1_delta[j]);
			}
			return output;
		});
		// let deltas = [];

		// for (let j = 0; j < pred.length; j++) {
		// 	deltas.push(pred[j] - goals[i]);
		// }
		// let weights_delta = [];
		// for (let j = 0; j < weights.length; j++) {
		// 	weights_delta[j] = [];
		// 	for (let k = 0; k < weights[j].length; k++) {
		// 		weights_delta[j].push(inputOne[k] * deltas[j]);
		// 	}
		// }
		// for (let j = 0; j < weights.length; j++) {
		// 	for (let k = 0; k < weights[j].length; k++) {
		// 		weights[j][k] -= inputOne[k] * deltas[j] * alpha;
		// 	}
		// }
	}
};

for (let i = 0; i < 5; i++) {
	teach();
}

const pred = neural(inputs[5], weights);
console.log({ pred });
