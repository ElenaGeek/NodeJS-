// Print the content of the file in the directory after the answer on question "Please enter the path to the file: " ../dir1/access.log

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("Please enter the path to the file: ", function(inputedPath) {
const filePath = path.join(__dirname, inputedPath);

    fs.readFile(filePath,'utf8', (err, data) => {
    console.log(data);
    rl.close();
    });
});

rl.on("close", function() {
process.exit(0);
});
    