const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

async function getPostData(request) {
    return new Promise((resolve, reject) => {
      let body = '';
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        resolve(body);
      });
      request.on("error", (error) => {
        reject(error);
      });
    });
  }

module.exports = {
    getPostData,
    writeDataToFile
}