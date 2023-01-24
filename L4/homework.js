// 1. Print the content of the file in the directory after the answer on question "Please enter the path to the file: " /dir1/access.log
// 2. Read a list if files within the inputed directory and print the content of choosen file
// 3. Search for sertain data within the file and save results into new files

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");
const fsp = require("fs/promises");

const rf = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rf.question("Please enter the path to the file: ", function(inputedPath) {
const filePath = path.join(__dirname, inputedPath);

    //Read data from the file
    fs.readFile(filePath,'utf8', (err, data) => {
    //console.log(data);   

    // List of files
    const dirname = path.dirname(filePath);
    console.log("Inputed path: "+dirname);
    readdir(dirname);

    // Run file to search data
    const readPath = path.normalize(filePath);
    console.log(readPath);
    //runfile(readPath);
    
    rf.close();
    });   

});

rf.on("close", function() {
//process.exit(0);
});


// ***************************************

//const dirname = process.cwd();
//console.log("Input: "+dirname);

function readdir(dirname){
fsp
    .readdir(path.join(dirname))
    .then(async (indir) => {
        const list = []
        for (const item of indir) {
            const src = await fsp.stat(path.join(dirname, item))
            if (src.isFile()) list.push(item)
        }
        return list
    })
    .then((choices) => {
        return inquirer
        .prompt({
            name: "fileName",
            type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
            message: "Choose file",
            choices
        })
    })
    .then(({ fileName }) => fsp.readFile(path.join(dirname, fileName), 'utf-8'))
    .then(console.log)

}

// ***************************************

function runfile(readPath){
const readStream = fs.createReadStream(readPath, 'utf-8');

const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';
const writeStream1 = fs.createWriteStream(`${ip1}`);
const writeStream2 = fs.createWriteStream(`${ip2}`);

let numStr = 0;

const rl = readline.createInterface({
    input: readStream
});

rl.on('line', (line) => {
    if (line.includes(ip1)) {
        writeStream1.write(line + '\n');
    }

    if (line.includes(ip2)) {
        writeStream2.write(line + '\n')
    }

    console.log(++numStr)
});
}