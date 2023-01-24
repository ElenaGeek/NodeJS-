const fs = require('fs');
fs.readFile('access_tmp.log', (err, result) => {
  if (err) {
    console.error('Error'+err);
    return;
  }
  // Log the file contents if no error
  console.log(result);
});