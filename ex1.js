let sum = () => {};
let numb_vector = (numb, vector) => vector.map(val=>val*numb);
const neural = (inputs, weights) => numb_vector(inputs, weights);
/** */
let weights = [0.3, 0.2, 0.9];
let input = 0.65;
let goal = [0.1, 1, 0.2];

for (let i = 0; i < 100; i++) {

    let predAr = neural(input, weights);
    console.log(predAr)
    let errors = [];
    let deltas = [];

    for(let j = 0; j < predAr.length; j++) {
        let delta = predAr[j]  - goal[j];
        deltas.push(delta);
        errors.push(Math.pow(delta,2))
    }

    let weight_deltas = numb_vector(input, deltas);
    for(let j = 0; j < predAr.length; j++) {
        weights[j] -= weight_deltas[j] * 0.1;
    }
}
