import * as Discord from 'discord.js';

export default class IntelDiscord {
    config: Config;
    ready: boolean = false;
    client: Discord.Client;
    channels: {[keys: string]: any} = {};

    constructor(config: Config) {
        this.config = config;
        this.client = new Discord.Client();
        this.client.on('ready', this.readyHandler)
        this.client.login(config.discord.token);
    }

    readyHandler = () => {
        this.ready = true;
        let channelNames = Object.values(this.config.routes).map((x) => x.destination);
        for(let c of channelNames) {
            this.channels[c] = this.client.channels.find("name",c);
        }
    }

    
    cleanText(text: string): string {
        text = text.replace(/<br>/g,'\n');
        text = text.replace(/&gt;/g,'>');
        text = text.replace(/(<([^>]+)>)/ig, '');
        
        if(text.length > 2000) {
            text = text.substring(0,2000) + '...(truncated)';
        }
        return text;
    }

    sendEmbed = async (channel: string, embed: Discord.RichEmbed) => {
        this.channels[channel].send({embed});
    }
}