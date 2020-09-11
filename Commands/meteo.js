const Discord = require('discord.js');
const weather = require("weather-js");

module.exports.run = async(client, message, args) => {

  let location = args.slice(0).join(" ");
  let unit = "C";

  if(!location){
      return message.channel.send("Il faut préciser une ville :round_pushpin:");
  }

  try {
      weather.find({search: location, degreeType: unit}, function(err, data) {
          if(err) {
              return message.channel.send("Je ne trouve pas d'information sur la météo de " + location + " :x:");
          } else {
              data = data[0];
              if(data === undefined) {
                  return message.channel.send("Je ne trouve pas d'information sur la météo de " + location + " :x:");
              } else {

              let array_skycode = {
                "1": ":thunder_cloud_rain:",
                "2": ":thunder_cloud_rain:",
                "3": ":thunder_cloud_rain:",
                "4": ":thunder_cloud_rain:",
                "5": ":cloud_rain: :cloud_snow:",
                "6": ":cloud_rain: :cloud_snow:",
                "7": ":cloud_snow:",
                "8": ":cloud_snow:",
                "9": ":cloud_snow:",
                "10": ":cloud_snow:",
                "11": ":cloud_snow:",
                "12": ":cloud_snow:",
                "13": ":cloud_snow:",
                "14": ":cloud_snow:",
                "15": ":dash:",
                "16": ":cloud_snow:",
                "17": ":thunder_cloud_rain:",
                "18": ":cloud_rain:",
                "19": ":fog:",
                "20": ":fog:",
                "21": ":fog:",
                "22": ":fog:",
                "23": ":dash:",
                "24": ":dash:",
                "25": ":snowflake:",
                "26": ":cloud:",
                "27": ":cloud:",
                "28": ":white_sun_cloud:",
                "29": ":cloud:",
                "30": ":partly_sunny:",
                "31": ":crescent_moon:",
                "32": ":sunny:",
                "33": ":cloud:",
                "34": ":white_sun_small_cloud:",
                "35": ":thunder_cloud_rain:",
                "36": ":sunny:",
                "37": ":sunny: :thunder_cloud_rain:",
                "38": ":sunny: :thunder_cloud_rain:",
                "39": ":white_sun_rain_cloud:",
                "40": ":cloud_rain:",
                "41": ":sunny: :cloud_snow:",
                "42": ":cloud_snow:",
                "43": ":cloud_snow:",
                "44": ":sunny:",
                "45": ":crescent_moon: :cloud_rain:",
                "46": ":crescent_moon: :cloud_snow:",
                "47": ":crescent_moon: :thunder_cloud_rain:"
              };

              //console.log(data);
              // 0 = veille | 1 = aujourd'hui | 2 = demain, etc.
                return message.channel.send({
                  embed: {
                      color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                      fields: [
                          {
                              name: `${array_skycode[data.current.skycode]} | Maintenant`,
                              value: `${data.current.temperature}°${unit} \`${data.current.skytext}\` avec un ressentie de ${data.current.feelslike}°${unit}\nVent : ${data.current.winddisplay}`,
                              inline: false
                          },
                          {
                              name: `${array_skycode[data.forecast[1].skycodeday]} | ${convertDate(data.forecast[1].date)} - Prévisions pour aujourd'hui`,
                              value: `Température haute : ${data.forecast[1].high}°${unit}\nTempérature basse : ${data.forecast[1].low}°${unit}\n\`${data.forecast[1].skytextday}\` avec ${data.forecast[1].precip || 0}% de chance de précipitation`,
                              inline: false
                          },
                          {
                              name: `${array_skycode[data.forecast[2].skycodeday]} | ${convertDate(data.forecast[2].date)} - Prévisions pour demain`,
                              value: `Température haute : ${data.forecast[2].high}°${unit}\nTempérature basse : ${data.forecast[2].low}°${unit}\n\`${data.forecast[2].skytextday}\` avec ${data.forecast[2].precip || 0}% de chance de précipitation`,
                              inline: false
                          },
                          {
                              name: `${array_skycode[data.forecast[3].skycodeday]} | ${convertDate(data.forecast[3].date)} - Prévisions pour après-demain`,
                              value: `Température haute : ${data.forecast[3].high}°${unit}\nTempérature basse : ${data.forecast[3].low}°${unit}\n\`${data.forecast[3].skytextday}\` avec ${data.forecast[3].precip || 0}% de chance de précipitation`,
                              inline: false
                          }
                      ],
                      author: {
                          name: `Météo de ${data.location.name}`
                        }
                    }
                })
              }
          }
      });
  } catch(err) {
    console.log(err)
      return message.channel.send("J'ai rencontré une erreur, veuillez réessayer :x:");
  }

}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; };
    let d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "meteo",
    description: "Affiche la météo d'une ville",
    usage: "/meteo <ville> <pays>"
}
