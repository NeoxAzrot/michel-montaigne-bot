const Discord = require('discord.js');
const movieInfo = require('movie-info');

module.exports.run = async(client, message, args) => {

    let film = args.slice(0).join(" ");

    if(!film){
        return message.channel.send("Cette commande permet de rechercher des informations sur un film : `/movie <film>`");
    }else{
        movieInfo(film).then(
            function (response) {
                //console.log(response);

                if(response.name === "Error"){
                    return message.channel.send("Je n'ai pas réussi à trouver ce film :x:");
                }else{
                    let restriction;

                    if(response.adult){
                        restriction = "Prohibited at least 18 years of age"; // - 18
                    }else{
                        restriction = "Suitable for all audiences";
                    }

                    let image_haut_droit = response.imageBase + response.backdrop_path;
                    let image_millieu = response.imageBase + response.poster_path;
                    let language_film = response.original_language;
                    let titre_film = response.title;
                    let description_film = response.overview;
                    let populaire = response.popularity;
                    let date_film =  response.release_date;
                    let note_film = response.vote_average;
                    let nombre_vote_film = response.vote_count;

                    let date_vrai = date_film.split('-');

                    return message.channel.send({
                        embed: {
                            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                          	image: {
                          		url: image_haut_droit,
                          	},
                            thumbnail: {
                              url: image_millieu,
                            },
                            fields: [
                                {
                                    name: ":date: | Date de sortie",
                                    value: `${date_vrai[2]}/${date_vrai[1]}/${date_vrai[0]}`,
                                    inline: true
                                },
                                {
                                    name: ":underage: | Restriction",
                                    value: restriction,
                                    inline: true
                                },
                                {
                                    name: ":flag_eu: | Langue",
                                    value: language_film,
                                    inline: true
                                },
                                {
                                    name: ":pencil: | Description",
                                    value: description_film,
                                    inline: false
                                },
                                {
                                    name: ":busts_in_silhouette: | Popularité",
                                    value: populaire.toString(),
                                    inline: true
                                },
                                {
                                    name: ":star: | Note du film",
                                    value: `${note_film} / 10`,
                                    inline: true
                                },
                                {
                                    name: ":page_facing_up: | Nombre de notes",
                                    value: nombre_vote_film,
                                    inline: true
                                }
                            ],
                            author: {
                                name: `Informations sur ${titre_film}`
                              }
                        }
                    })
                }
            },
            function (error) {
                return message.channel.send("Il y a eu une erreur, veuillez réessayer ultérieurement :x:");
            }
        )
    }

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "movie",
    description: "Affiche des informations sur un film",
    usage: "/movie <film>"
}
