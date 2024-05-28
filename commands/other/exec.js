const {
  exec
} = require('child_process');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.channel.send(":x: Vous avez pas la permission de faire cette commande ! <Developpeur de Uty>");

  exec(`${args.join(' ')}`, (error, stdout) => {
    let response = (error || stdout);
    if (!error) message.channel.send(`\\✅ | The execution ended without problems:`);
    else message.channel.send(`\\❌ | An error occurred while executing:`);
    message.channel.send(`${response}`, {
      code: "js",
      split: "\n"
    }).catch(e => console.log(e));
  });
};

exports.help = {
  name: "exec",
  description: "Exec an command",
  usage: "exec <exex>",
  example: "exec ls"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};