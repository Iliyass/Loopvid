import path from 'path';
import shell from 'shelljs';
const { spawn, exec } = require('child_process');



/*
*  
*  COMMAND: ./node_modules/babel-cli/bin/babel-node.js index.js video.mp4
*
*/


const [, , filePath ] = process.argv

const cropDetect = exec(`ffmpeg -i ${filePath} -t 1 -vf cropdetect -f null - 2>&1 | awk '/crop/ { print $NF }' | tail -1`)

cropDetect.stdout.on('data', (data) => {
    const cropValue = data.toString().replace('crop=', '').replace('\n', '');
    const position = filePath.lastIndexOf('.')
    const cropFilePath = `${filePath.substr(0, position)}_cropped_${+new Date()}_${filePath.substr(position)}`

    if(!cropValue) {
      return console.log('shit something happen', cropValue, data.toString());
    }

    const cropping = exec(`ffmpeg -i ${filePath} -vf crop=${cropValue} ${cropFilePath}`)

    cropping.stdout.on('data', (data) => {
      console.log('cropValue', data);
    });

    cropping.stderr.on('data', (data) => {
      console.log(`cropping stderr: ${data.toString()}`);
    });
    
    cropping.on('close', (code) => {
      console.log(`cropping child process exited with code ${code}`);
    });

});

cropDetect.stderr.on('data', (data) => {
  console.log(`stderr: ${data.toString()}`);
});

cropDetect.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});