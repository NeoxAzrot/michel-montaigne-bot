const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let hexa_color = args.slice(0).join(" ");

    if(hexa_color.length == 0){
        return message.channel.send("Cette commande permet de trouver une couleur : `/color <nombre en héxadécimal>` ou `/color random`");
    }

    if(hexa_color.startsWith("#")) hexa_color = hexa_color.substr(1);

    if(hexa_color.length != 6){
        let example = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        return message.channel.send("Une couleur héxadécimal doit avoir **6 caractères**, comme ceci : `" + example + "`");
    }

    if(hexa_color == "random"){
        hexa_color = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        hexa_color = hexa_color.toUpperCase();
    } else {
        let n = 1;
        let hexa_is_ok = true;
        let test_hexa = ["A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hexa_color = hexa_color.toUpperCase();

        while(n <= hexa_color.length){
            let test_char = hexa_color.slice(n-1, n);
            console.log(test_hexa.find(x => x == test_char))
            if(!test_hexa.find(x => x == test_char)){
              if(test_char != 0) { // Car il comprend pas le 0 à cause du test c'est null
                hexa_is_ok = false;
              }
            }
            n++;
        }

        if(!hexa_is_ok){
            return message.channel.send("Les valeurs en héxadécimal vont de **0 à F** :x:");
        }
    }

    let hexa_to_rgb = { "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15 };

    let red1 = hexa_color.slice(0, 1);
    if(isNaN(red1)) red1 = hexa_to_rgb[red1];

    let red2 = hexa_color.slice(1, 2);
    if(isNaN(red2)) red2 = hexa_to_rgb[red2];

    let green1 = hexa_color.slice(2, 3);
    if(isNaN(green1)) green1 = hexa_to_rgb[green1];

    let green2 = hexa_color.slice(3, 4);
    if(isNaN(green2)) green2 = hexa_to_rgb[green2];

    let blue1 = hexa_color.slice(4, 5);
    if(isNaN(blue1)) blue1 = hexa_to_rgb[blue1];

    let blue2 = hexa_color.slice(5, 6);
    if(isNaN(blue2)) blue2 = hexa_to_rgb[blue2];

    let red = (parseInt(red1)*16 + parseInt(red2)).toString();
    let green = (parseInt(green1)*16 + parseInt(green2)).toString();
    let blue = (parseInt(blue1)*16 + parseInt(blue2)).toString();

    return message.channel.send({
        embed: {
            color: parseInt('0x' + hexa_color),
            thumbnail: {
                url: `https://dummyimage.com/150x150/${hexa_color}/fff&text=+`
            },
            fields: [
                {
                    name: "Héxadécimal",
                    value: `#${hexa_color}`,
                    inline: true
                },
                {
                    name: "RGB (Red, Green, Blue)",
                    value: `rgb(${red}, ${green}, ${blue})`,
                    inline: true
                }
            ],
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL,
                proxy_icon_url: ' '
              }
        }
    })

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "color",
    description: "Affiche une couleur en héxadécimal ou affiche une couleur aléatoire",
    usage: "/color <nombre en héxadécimal> ou /color random"
}
