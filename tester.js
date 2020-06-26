// var readline = require('readline');

// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("What do you think of node.js? ", function (answer) {
//     console.log("Thank you for your valuable feedback:", answer);
// });
var url = 'http://localhost';
var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(start + ' ' + url);