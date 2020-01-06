const math = require('mathjs')
var weight_0_1 = [[0.1,0.1], [-.1,1],[-.1,1],[0.1,0.1],[0.1,0.1],[0.1,0.1]];
var weight_1_2 = [[.2,.5,.6,.1,.8,1]];

let inputs = [[2,10],[10,2],[3,4],[2,5],[2,6],[9,2],[6,6]];
var goal = [[20],[20],[12],[10],[12],[18],[36]];

let alpha = 0.001;
const relu = (vec)=> vec.map(el=>el>0?el:0)
const v_sum = (v1, v2) => {
  var output = 0;
//   console.log(v1.length,v2.length)
  for (var i = 0; i < v1.length; i++) {
	output += v1[i] * v2[i];
  }
  return output;
}
const v_minus_v = (v_1, v_2) => {
  let output = [];
  for (let i = 0; i< v_1.length; i++) {
	output.push(v_1[i] - v_2[i]);
  }
  return output;
}
const multmat = (vect, mat) => {
	let output = [];
//     console.log({vect, mat})
	for(let i = 0; i < mat.length; i++) {
	  output.push(v_sum(vect,mat[i]));
	}
  return output;
}
const transpose = (matrix) => {

  if(!Array.prototype.isPrototypeOf(matrix[0])) {
//     console.log({matrix});
	matrix = [matrix];
	
  } 
  
  let out = [];
  for(let i = 0; i < matrix.length; i++ ){
	   for(let j = 0; j < matrix[i].length; j++ ){
		 if(!out[j]) {
		   out[j] =[];
		 }
		out[j].push(matrix[i][j]);
	  } 
  }
//   console.log({out});
  return out;
}
const apply_delta = (w, deltas, inputs) => {
  let out = [];
//   console.log({w,deltas,inputs})
  for(let i = 0; i < w.length; i++ ){
	if(!out[i]) {
		   out[i]=[];
		 }
	   for(let j = 0; j < w[i].length; j++ ){
		//    console.log(inputs[j], deltas[i])
			out[i].push(w[i][j] - (alpha * (inputs[j] * deltas[i])))
			// console.log((deltas[i]))
	   }
  }
//   console.log({out})
  return out
}
const neural = (inp, w) => {
	return multmat(inp, w);
}

const prediction = (layer_0) => {
  let layer_1 = neural(layer_0, weight_0_1);
//     console.log({layer_1, weight_1_2})
	return neural(layer_1, weight_1_2);
}
const relu2 = (v1, v2) => {
  let out = [];
//   console.log({v1,v2})
  for(let i = 0; i < v1.length; i++) {
	out.push(v1[i] * (v2[i]>0?1:0))
  }
  return out;
}
const learn = (layer_0, goal) => {
	// console.log({layer_0, weight_0_1})
	let layer_1 = neural(layer_0, weight_0_1);
    // console.log({layer_1, weight_1_2})
	let layer_2 = relu(neural(layer_1, weight_1_2));
	let error = Math.pow(v_minus_v(layer_2, goal)[0],2)
	// /console.log({error:error.toFixed(5)})
  
	let layer_2_delta = v_minus_v(layer_2, goal);
    // console.log({layer_2_delta})
	let layer_1_delta = relu2(multmat(layer_2_delta, transpose(weight_1_2)), layer_1);
    // console.log({layer_1_delta})
	weight_1_2 = apply_delta(weight_1_2, layer_2_delta, (layer_1));
//     console.log({weight_1_2});
	weight_0_1 = apply_delta(weight_0_1, layer_1_delta, (layer_0));
//     console.log({weight_0_1});
  return {layer_2,error}
}
function  run() {
	   for(let i = 0; i < inputs.length; i++){
		 return learn(inputs[i],goal[i]);
		 
	   }
}





for (var i = 0; i < 40000; i++){
	let {pred,error} = run();

	

//   console.log(pred)
	
}

console.log(prediction([2,2]));
console.log(prediction([2,3]));
console.log(prediction([2,4]));
console.log(prediction([2,5]));
console.log(prediction([2,6]));
console.log(prediction([2,7]));
console.log(prediction([6,6]));