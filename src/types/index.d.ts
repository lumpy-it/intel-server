interface Config {
    styles: {[key: string]: Style}
    routes: {[key: string]: Route}
    discord: DiscordConfig;
    api_token: string;
    port: number;
}

interface Style {
    color: string;
    img: string;
}

interface Route {
    style: string;
    destination: string;
    alias?: string;
}

interface DiscordConfig {
    token: string;
}

interface Message {
    messageID: number;
    senderID: number;
    senderName: string;
    sentDate: string;
    title: string;
    toCorpOrAllianceID: string;
    toCharacterIDs: string;
    toListID: string;
    senderTypeID: number;
    body?: string;
    keyName?: string;
    mailingListName?: string;
}