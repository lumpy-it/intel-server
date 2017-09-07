import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bearerToken from 'express-bearer-token';

import IntelDiscord from './Discord.js';
import Formatter from './Formatter.js';

const config = require('../config.json') as Config;

const intelDiscord = new IntelDiscord(config);
const formatter = new Formatter(config, intelDiscord);
const app = express();

app.use(bearerToken());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    let token = (<any>req).token;
    if(token != config.api_token) {
        res.status(401).end();
    } else {
        next();
    }
});

app.post("/mails", (req, res) => {
    let messages = req.body;
    for(let m of messages) {
        formatter.processMessage(m);
    }

    res.status(200).send("Success").end();
});

app.post("/pings", (req, res) => {
    formatter.processPing(req.body);
    res.status(200).send("Success").end();
});

app.post("/debug", (req, res) => {
    formatter.processDebug(req.body.debug);
    res.status(200).send("Success").end();
});

app.post("/test", (req, res) => {
    console.log(req.body);
    
    formatter.processDebug(req.body.debug);

    res.json({result: "Success"});
});

app.listen(config.port, () => {
    console.log("Intel App running on Port 7000");
    console.log("  Press CTRL-C to stop\n");
});