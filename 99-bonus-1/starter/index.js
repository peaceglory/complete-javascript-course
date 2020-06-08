const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer(((req, res) => {
    console.log(`Server access: ${req.url}`);

    const parsed = url.parse(req.url, true);
    const pathName = parsed.pathname;
    const id = parsed.query.id;

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutput);
            });
        });
    } else if (pathName === '/laptop' && id < laptopData.length && id >= 0) {
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            let output = replaceTemplate(data, laptopData[id]);
            res.end(output);
        });
    } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        });
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('NOT FOUND');
    }
}));

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests');
});

function replaceTemplate(data, laptop) {
    return data.replace(/{%PRODUCTNAME%}/g, laptop.productName)
        .replace(/{%IMAGE%}/g, laptop.image)
        .replace(/{%PRICE%}/g, laptop.price)
        .replace(/{%CPU%}/g, laptop.cpu)
        .replace(/{%SCREEN%}/g, laptop.screen)
        .replace(/{%STORAGE%}/g, laptop.storage)
        .replace(/{%RAM%}/g, laptop.ram)
        .replace(/{%DESCRIPTION%}/g, laptop.description)
        .replace(/{%ID%}/g, laptop.id);
}