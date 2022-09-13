import * as fs from 'node:fs';

fs.writeFile('message.txt', 'Hi Node.js', 'utf-8',(err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});