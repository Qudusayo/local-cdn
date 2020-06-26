const express = require('express');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const server = express();
const port = 8900 || process.env.PORT;
const url = `http://localhost:${port}`;

server.use(express.static(path.join(__dirname, 'static')));
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

server.get('/files', (req, res) => {
    const cssPath = path.join(__dirname, 'static', 'css');
    const jsPath = path.join(__dirname, 'static', 'js');
    const newfiles = [req.headers.host]
    fs.readdir(cssPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        newfiles.push(files)
        fs.readdir(jsPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            newfiles.push(files)
            res.json(newfiles);
        });
    });
})

server.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', 'Starting the development server\n')
    console.log('You can now get your packages in the browser\n')
    console.log('\tLocal:\t\thttp://localhost:8900/\n')
    console.log("\x1b[31m", 'Press [Ctrl + C] to abort the server')
    var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
    setTimeout(() => {
        child_process.exec(start + ' ' + url);
    }, 3000)
})