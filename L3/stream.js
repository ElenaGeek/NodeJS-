const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('access_tmp.log');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
 
  for await (const line of rl) {
    // Each line in file will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);

    // 89.123.1.41 и 34.48.240.111
    const data = `${line}`.substring(0,2); 
    // const editedData = data.replace(/world\n/, '');
    // const editedData = data.toString().replace(/((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}/g, '*.*.*.*')   
    switch (data) {
      case '89':
        fs.writeFile('89.123.1.41.log', `${line}\r`, { flag: 'a' }, console.error)
        break;
        case '34':
        fs.writeFile('34.48.240.111.log', `${line}\r`, { flag: 'a' }, console.error)
        break;
      default:
        break;
    }   
  }
}

processLineByLine();
