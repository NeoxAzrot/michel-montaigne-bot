const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.login(process.env.TOKEN); // Find the TOKEN : https://discord.com/developers/applications/744195842126381176/bot

client.commands = new Discord.Collection();

fs.readdir('./Commands/', (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if(commandes.length <= 0) return console.log("No orders found !");

    commandes.forEach((f) => {

        let commande = require(`./Commands/${f}`);
        console.log(`${f} loaded order !`);

        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir('./Events/', (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events in loading...`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split('.')[0];

        client.on(event, events.bind(null, client));
    });
});
