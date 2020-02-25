const fs = require('fs')
const path = require('path');

function writeLog(data) {
  const dir = path.resolve(__dirname, '..', 'logs');

  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, error => {
      if (error) {
        reject(error);
      }
      fs.appendFile(`${dir}/log.txt`, data, 'utf-8', err => {
        if (err) {
          reject(err);
        }
        resolve()
      });
    });
  })
}

module.exports = writeLog