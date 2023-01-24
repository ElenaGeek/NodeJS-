// Print the content of the file from command line argument npm run ypath -- -p ../dir1/access.log


const fs = require("fs");
const yargs = require("yargs");
const path = require("path");

const options = yargs
.usage("Usage: -p <path>")
.option("p", { alias: "path", describe: "Path to file", type: "string",
demandOption: true })
.argv;
const filePath = path.join(__dirname, options.path);
fs.readFile(filePath,'utf8', (err, data) => {
console.log(data);
});
