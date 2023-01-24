// Read a list of files within the directory assigned for const dirname and prinf the content of choosen file

const path = require("path");
const inquirer = require("inquirer");
const fsp = require("fs/promises");

const dirname = '/Users/elenk/Elena/Geekbrains/Geek_Lessons/Z_Node_JS/nodefirst/L4/dir2'

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