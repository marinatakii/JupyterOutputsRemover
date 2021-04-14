const fs = require('fs');

if (process.argv.length < 3) {
	const scriptName = __filename.split(/[\\/]/).pop();
	console.log(`usage: node ${scriptName} <input-file-name> [optional: <output-file-name>]`);
	return;
}

var args = process.argv[2];
let inputName = process.argv[2];

let inputPath = `${inputName}.ipynb`;
let outputName = process.argv[3] || `${inputName}_clean`;
let outputPath = `${outputName}.ipynb`;

console.log(`Reading ${inputPath}`);
let rawdata = fs.readFileSync(inputPath);

console.log("Parsing file");
let jupyter = JSON.parse(rawdata);

console.log("Cleaning up output");
for (let i = 0; i < jupyter.cells.length; i++) {
	let cell = jupyter.cells[i];
	cell.outputs = [];
}

console.log("Converting to text");
jupyterText = JSON.stringify(jupyter);

console.log(`Writing ${outputPath}`);
fs.writeFileSync(outputPath, jupyterText);
