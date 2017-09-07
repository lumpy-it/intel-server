import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bearerToken from 'express-bearer-token';

import * as moment from 'moment';

import * as Discord from 'discord.js';

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
    console.log(req.body);
    formatter.processPing(req.body);
    res.end();
});

app.post("/test", (req, res) => {
    console.log(req.body);

    let message: Message = { 
        messageID: 367542136,
        senderID: 161605249,
        senderName: 'CoWNighthawk',
        sentDate: '2017-09-06 17:32:00',
        title: 'ABgesagt Move OP  BJD4-E &gt;&gt;&gt; 4-GB14 06.09.2017 21:00 UHR DT',
        toCorpOrAllianceID: '',
        toCharacterIDs: '',
        toListID: '145187873',
        senderTypeID: 1375,
        body: '<font size="12" color="#bfffffff">Weil Max CTA<br><br>--------------------------------<br>Move OP  BJD4-E &gt;&gt;&gt; 4-GB14 06.09.2017 21:00 UHR DT<br>From: </font><font size="12" color="#ffffa600"><a href="showinfo:1377//161605249">CoWNighthawk</a><br></font><font size="12" color="#bfffffff">Sent: 2017.09.04 18:07<br>To: <br><br><br><br>Es wurde die Frage gestellt bekommen wir dasnicht auch hin?<br>Na schauen wir mal.<br><br>Vorläufig die einzige Move-OP von mir in Aussicht.<br><br>Wir nehmen alles mit von Dread/Carrier/Fax/Macha/Ferox oder was ihr sonnst noch nicht geschafft habt wegzubringen.<br><br>Alle in Combat fit aber mit  </font><font size="12" color="#ffffa600"><a href="showinfo:11577">Improved Cloaking Device II</a></font><font size="12" color="#bfffffff"> gefittet.<br><br>WO:Korrektur  </font><font size="12" color="#ffffa600"><a href="showinfo:35833//1025153668052">BJD4-E - Front</a></font><font size="12" color="#bfffffff"> <br><br>Wann: <br>VorFormup: 20:30 Mittwoch 06.09.2017 21:00 UHR DT Route checken Cyno in Posi bringen JB checken auf Funktion<br>Formup: Mittwoch 06.09.2017 21:00 UHR DT <br>Start  : Mittwoch 06.09.2017 21:15 UHR DT<br>oder wenn alle Schiffe verteilt sind.<br>Sprecht miteinander wer was wann wo mitnehmen kann damit wir püktlich los können,<br>und fangt nicht an 21:uhr loszutraveln.<br><br>Einige </font><font size="12" color="#ffffa600"><a href="showinfo:12092">Interceptors</a></font><font size="12" color="#bfffffff"> und zumindest 1x Schiff das  </font><font size="12" color="#ffffa600"><a href="showinfo:21096">Cynosural Field Generator I</a></font><font size="12" color="#bfffffff"> gefittet hat wird benötogt.<br>Also auch du wirst gebraucht der schon alle seine Schiffe in </font><font size="12" color="#ffffa600"><a href="showinfo:35834//1023517080386">4-GB14 - Phoenix Sky Harbor</a></font><font size="12" color="#bfffffff"> hat.<br>Weil dort soll hingehen.<br><br>Während ich die Mail schreibe schau ichmir die Map an und sieht recht ruhig aus mal sehen ob es so bleibt.<br>Alternativ müsen wir Umweg fliegen über JB etc.<br>Drum möglichst wenig Blue Jump Fatique haben.<br><br>Gruss  </font><font size="12" color="#ffffa600"><a href="showinfo:1375//161605249">CoWNighthawk</a></font><font size="12" color="#bfffffff"> <br><br>PS:Treffpunkt TS:CTA Fleet <br>PPS: Bei CTA sind wir dann schon mal richtig nur wird dann die Move OP verschoben.</font>',
        keyName: 'XIX Mails',
        mailingListName: 'SYN.OP'
    };
    
    mails.processMessage(message);

    res.json({result: "Success"});
});

app.listen(7000, () => {
    console.log("Intel App running on Port 7000");
    console.log("  Press CTRL-C to stop\n");
});





