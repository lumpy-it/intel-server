import IntelDiscord from './Discord.js';
import { RichEmbed } from 'discord.js';
import * as moment from 'moment';

export default class Formatter {
    discord: IntelDiscord;
    config: Config;

    constructor(config: Config, discord: IntelDiscord) {
        this.config = config;
        this.discord = discord;
    }

    async processMessage(message: Message) {
        const route = this.config.routes[message.keyName];
        
        const e = this.fromStyle(route.style);

        e.setAuthor(message.mailingListName,"https://lumpy.eu/img/mail.png");
        e.setTitle(this.discord.cleanText(message.title));
        e.addField('Sender', message.senderName, false);

        const t = moment.utc(message.sentDate);
        const hhmm = t.format("DD.MM.YYYY, HH:mm");
        const ago = t.fromNow();
        e.setFooter(`${hhmm} (${ago})`);

        e.setDescription((this.discord.cleanText(message.body)));

        await this.discord.sendEmbed(route.destination,e);
    }

    async processPing(ping: any) {
        const route = this.config.routes[ping.account];
        if(route == undefined) {
            console.log("ping from unknown source");
            return;
        }
        const e = this.fromStyle(route.style);
        e.setAuthor(route.alias,"https://lumpy.eu/img/ping.png");
        e.addField('Sender', ping.sender);

        const t = moment.utc();
        const hhmm = t.format("DD.MM.YYYY, HH:mm");
        e.setFooter(`${hhmm}`);

        e.setDescription((this.discord.cleanText(ping.message)));

        await this.discord.sendEmbed(route.destination, e);
    }
    
    async processDebug(message: any) {
        const route = this.config.routes["debug"];

        await this.discord.sendMessage(route.destination, message);
    }

    private fromStyle(styleKey: string) {
        let e = new RichEmbed();
        let style = this.config.styles[styleKey];
        e.setColor(style.color);
        e.setThumbnail(style.img);
        return e;
    }
}