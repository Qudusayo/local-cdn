const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 8900 || process.env.PORT;

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

server.listen(port, () => console.log(
    `Server started on port ${port}

CSS link is http://localhost:${port}/css/your_css_file_name e.g http://localhost:${port}/css/bootstrap.min.css

Javascript link is http://localhost:${port}/js/your_js_file_name e.g http://localhost:${port}/js/bootstrap.min.js
`
))