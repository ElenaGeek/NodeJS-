#!/usr/bin/env node

// Read a list if files within the current directory and print the content of choosen file

// import inquirer from "inquirer";
// import fsp from 'fs/promises';
// import path from 'path';

const inquirer = require("inquirer");
const fsp = require("fs/promises");
const path = require("path");

const dirname = process.cwd();

fsp
    .readdir(path.join(__dirname))
    .then(async (indir) => {
        const list = []
        for (const item of indir) {
            const src = await fsp.stat(path.join(__dirname, item))
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
    .then(({ fileName }) => fsp.readFile(path.join(__dirname, fileName), 'utf-8'))
    .then(console.log)