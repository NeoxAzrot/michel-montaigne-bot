const Discord = require('discord.js');

module.exports = async(client, packet) => {

    // Les emojis : 1️⃣2️⃣3️⃣🎫🎮
    let roles = {
      "1️⃣": "744686372912103545",
      "2️⃣": "744686443196186794",
      "3️⃣": "744876495314485328",
      "🎫": "744686474146087002",
      "🎮": "744686604982943785"
    }

    if (packet.t == "MESSAGE_REACTION_ADD") {
      //console.log(packet);
      if(packet.d.message_id == "745964530051579965") {
        if(!client.guilds.get("744200274666586185").members.get(packet.d.user_id).roles.get(roles[packet.d.emoji.name])) {
          client.guilds.get("744200274666586185").members.get(packet.d.user_id).addRole(client.guilds.get("744200274666586185").roles.get(roles[packet.d.emoji.name]));
        }
      }
    }

    if(packet.t == "MESSAGE_REACTION_REMOVE") {
      //console.log(packet);
      if(packet.d.message_id == "745964530051579965") {
        if(client.guilds.get("744200274666586185").members.get(packet.d.user_id).roles.get(roles[packet.d.emoji.name])) {
          client.guilds.get("744200274666586185").members.get(packet.d.user_id).removeRole(client.guilds.get("744200274666586185").roles.get(roles[packet.d.emoji.name]));
        }
      }
    }

};
