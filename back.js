const sum = (inputs, weights) => {
	if (inputs.length !== weights.length) {
		return false;
	}
	let output = 0;
	for (let i = 0; i < inputs.length; i++) {
		output += inputs[i] * weights[i];
	}
	return output;
};
const el_mas = (delta, mas) => {
	let out = [];
	mas.forEach(element => {
		out.push(element * delta);
	});
	return out;
};
/** */

const neural = (inputs, weights) => {
	return sum(inputs, weights);
};
let weights = [0.1, 0.3, 0.2];
const inputs = [
	[1, 0, 1],
	[0, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
	[0, 1, 1],
	[1, 0, 1]
];
const goals = [0, 1, 0, 1, 1, 0];
const learn = () => {
	for (let i = 0; i < inputs.length; i++) {
		const Pred = neural(inputs[i], weights);
		const Delta = Pred - goals[i];
		const ERROR = Math.pow(Delta, 2);

		let weights_delta = el_mas(Delta, inputs[i]);
		for (let j = 0; j < weights.length; j++) {
			weights[j] -= weights_delta[j] * 0.1;
		}
	}
	let Pred = neural(inputs[0], weights);
	console.log({ Pred });
};
const run = inputs => {
	return neural(inputs, weights).toFixed(3);
};
for (let i = 0; i < 20; i++) {
	learn();
}

console.log(run([0, 0.8, 1]));
