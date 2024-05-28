const Discord = require("discord.js"),
disbut = require("discord-buttons");

exports.run = async (client, message, args) => {
    var help = new Discord.MessageEmbed()
    .setAuthor('Help :')
    .setDescription(`Prefix : ${client.config.prefix}\nList of commands :`)
    .addField('miscellaneous:','`banner`,`pic`,`del`')
    .addField('NSFW  :underage: :', '`4k`, `anal`, `ass`, `boobs` `pgif`, `pussy`')
    .addField('NSFW(Anime)  :underage: :','`hanal`, `hass`, `hboobs`, `hentai`, `hkitsune`, `hmidriff`, `hneko`, `holo`, `kemonomimi`, `neko`, `yaoi`')
    .addField('Other :', '`help`, `stats`,`dcv`')
    .addField('Dev cmds :', '`eval`, `exec`,`restart`,`reset`')
    .setTimestamp()

    message.channel.send(help)
};

exports.help = {
  name: "help",
  description: "Give all commands of the bot.",
  usage: "help",
  example: "help"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};
/////////
