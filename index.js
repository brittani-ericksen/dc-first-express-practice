"use strict";
const http = require('http');

const hostname = "127.0.0.1";
const port = 3333;

const express = require('express');
const app = express();

const server = http.createServer(app);
const db = require('./db');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

const rootController = (req, res) => {
    const snippet = `<h1>Hello from the root route</h1>`;
    res
        .status(200)
        .send(snippet)
        .end();
}

const fooController = (req, res) => {
    const snippet = `<h1>This is the foo controller</h1>`;
    res
        .status(200)
        .send(snippet)
        .end();
}

const helloController = (req, res) => {
    let snippet = `<h1>Hello There!</h1>`;
    if (req.params.name !== undefined) {
        snippet = `<h1>Hello ${req.params.name}</h1>`;
    }
    res
        .status(200)
        .send(snippet)
        .end();
}

const monsterController = (req, res) => {
    let snippet = `<h1>BOO!!!!!</h1>`;
// switch to return the monster's name and species depending on slug

    if (req.params.name === undefined && db !== undefined) {
        snippet += `<ul>`;
        db.map(monster => {
            snippet += `<li><a href="/monster/${monster.slug}">${monster.name}</a></li>`
        });
        snippet += `</ul>`;
    }

    if (req.params.name !== undefined) {

        snippet = `<h1>BOOOO!</h1>`;

        db.map(monster => {
            if (req.params.name === monster.slug) {
                snippet += `<p>I am ${monster.name}! I am a ${monster.species}.</p>`;
            }
        });

        // switch(req.params.name) {
        //     case db[0].slug: 
        //         snippet = `<h2>BOO!!!!! It is ${db[0].name}. They are a ${db[0].species}.</h2>`;
        //         break;
        //     case db[1].slug:
        //         snippet = `<h2>BOO!!!!! It is ${db[1].name}. They are a ${db[1].species}.</h2>`;
        //         break;
        //     case db[2].slug:
        //         snippet = `<h2>BOO!!!!! It is ${db[2].name}. They are a ${db[2].species}.</h2>`;
        //         break;
        //     case db[3].slug:
        //         snippet = `<h2>BOO!!!!! It is ${db[3].name}. They are a ${db[3].species}.</h2>`;
        //         break;
        // }
    }
    res
        .status(200)
        .send(snippet)
        .end();
}

app.get('/', rootController); // <-- ROOT route
app.get('/foo', fooController); // <-- FOO route
app.get('/hello/:name?', helloController); // <-- HELLO route
app.get("/monster/:name?", monsterController);