const Discord = require('discord.js');

module.exports = async(client) => {

    client.user.setPresence({
        game: {
            name: "/help"
        }
    })
};
