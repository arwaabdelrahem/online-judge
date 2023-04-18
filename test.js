// process.stdin.on('data', (data) => {
//   data = data.toString().toUpperCase();
//   console.log('🚀 ~ file: test.js:3 ~ process.stdin.on ~ data:', data);
//   process.stdout.write(data + '\n');
// });
// ----------------------------------------------------------------------------------------------------

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function ask(question) {
//   rl.question(question, (answer) => {
//     rl.write(`The answer received:  ${answer}\n`);

//     ask(question);
//   });
// }

// ask('What is your name: ');
// ----------------------------------------------------------------------------------------------------

process.stdin.resume();
process.stdin.setEncoding('utf-8');

var inputString = '';
var currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function (_) {
  inputString = inputString
    .trim()
    .split('\n')
    .map(function (string) {
      return string.trim();
    });

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function getArea(length, width) {
  var area;
  area = length * width;

  return area;
}

function getPerimeter(length, width) {
  var perimeter;
  // Write your code here
  perimeter = 2 * (length + width);

  return perimeter;
}

function main() {
  const length = +readLine();
  const width = +readLine();

  console.log(getArea(length, width));
  console.log(getPerimeter(length, width));
}
