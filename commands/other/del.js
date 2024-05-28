const Discord = require('discord.js');

module.exports = {
  help: {
    name: "del",
    description: `null`,
    usage: "null",
    example: "null"
  },

  conf: {
    aliases: [],
    cooldown: 5 // Integer = second.
  },

  run: async (bot, message, args, commandName) => {
   var args = message.content.split(" ").slice(1)
   const number = args.join(' ')
if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    const no = new Discord.MessageEmbed()
    .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
    .setDescription(` You dont have any permissions to execute this command!`)
    .setColor(`#131313`)
    message.channel.send(no)

} else {
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        const naw = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
        .setDescription(` I can not clear this chat without the \`Manage Messages\` permission!`)
        .setColor(`#131313`)
        message.channel.send(naw)
    } else {
        if(!number) {
            const naw = new Discord.MessageEmbed()
            .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
            .setDescription(` Please enter a number!`)
            .setColor(`#131313`)
            message.channel.send(naw)
        } else {
        if(isNaN(number)) {
                const notanumber = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(` This is not a valid number!`)
                .setColor(`#131313`)
                message.channel.send(notanumber)
        } else {
            if(number > 100) {
                const ripchatlmao = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(` Please enter a number from 1 - 100!`)
                .setColor(`#131313`)
                message.channel.send(ripchatlmao)
            } else {
                if(number < 1) {
                    const megobruhnow = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`Please enter a number higher than 0!`)
                .setColor(`#131313`)
                message.channel.send(megobruhnow)
                } else {
                const awaits = await message.channel.bulkDelete(number)
                const done = new Discord.MessageEmbed()
                .setTitle('Success!')
                .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(` Deleted ${awaits.size} messages in from this channel!`)
                .setFooter(`Requested by: ${message.author.username}`)
                .setColor(`#131313`)
                message.channel.send(done).then(sent => sent.delete({ timeout: 10000 }))
            }
        }
    }         
}
}
}
}
}