const http = require('http');
const path = require('path');
const fs = require('fs');

const readline = require('readline');
const colors = require('colors');
const inquirer = require('inquirer');
const fsp = require('fs/promises');
const formidable = require('formidable');

const host = 'localhost'
const port = 3000

const server = http.createServer((request, response) => {

  if (request.url == '/fileread') {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      response.write('File read');
      response.end();
    });
  } else {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<form action="fileread" method="post" enctype="multipart/form-data">');
    response.write('<input type="file" name="filetoread"><br><br>');
    response.write('<input type="submit">');
    response.write('</form>');

    return response.end();
  }
  console.log(request.filetoread);
  
    //const filePath = path.join(process.cwd(), request.filetoread)
    const filePath = path.join(process.cwd(), './access.log')
    const readStream = fs.createReadStream(filePath, {encoding: 'utf-8'})

    readStream.on('data', (chunk) => {
        console.log(chunk)
        response.write(chunk)
    })

// **********************************

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      const root = process.cwd();
      
      const findFilesInDir = (dirName) => {
        return fsp
          .readdir(dirName)
          .then((choices) => {
            return inquirer.prompt([
              {
                name: "fileName",
                type: "list", // input, number, confirm, list, rawlist, expand, checkbox, password
                message: "Choose file",
                choices,
              },
              {
                name: "findString",
                type: "input",
                message: "Enter something for search",
                async when({ fileName }) {
                  const fullPath = path.join(dirName, fileName);
                  const stat = await fsp.stat(fullPath);
      
                  return stat.isFile();
                },
              },
            ]);
          })
          .then(async ({ fileName, findString }) => {
            const fullPath = path.join(dirName, fileName);
            if (findString === undefined) return findFilesInDir(fullPath);
      
            return Promise.all([
              fsp.readFile(fullPath, "utf-8"),
              Promise.resolve(findString),
            ]);
          })
          .then((result) => {
            if (result) {
              const [text, findString] = result;
              const pattern = new RegExp(findString, "g");
              let count = 0;
              const out = text.replace(pattern, () => {
                count++;
                return colors.red(findString);
              });
      
              console.log(out, "\n", colors.green(`Found ${count} values`));
            }
          });
      };
      
      rl.question(
        `You are in: ${root} \n Please enter the path to the directory: `,
        (dirPath) => {
          const dirName = path.join(root, dirPath);
      
          findFilesInDir(dirName);
        }
      );
      
      rl.on("close", () => process.exit(0));

// **********************************

    readStream.on('end', () => {
        response.end()
    })
})

server.listen(port, host, () => console.log(`Server rinning at http://${host}:${port}`))