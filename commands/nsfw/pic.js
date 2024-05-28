const Discord = require('discord.js');

module.exports = {
  help: {
    name: "pic",
    description: "Get the avatar of a user.",
    usage: "pic <username_or_id>",
    example: "pic username#0000 or pic 1234567890"
  },

  conf: {
    aliases: [],
  },

  run: async (bot, message, args, commandName) => {
    const usernameOrId = args[0];

    try {
      let user;

      // Try to fetch the user by ID
      user = await bot.users.fetch(usernameOrId).catch(() => {});

      // If user not found by ID, try fetching by username and discriminator
      if (!user && usernameOrId.includes('#')) {
        const [username, discriminator] = usernameOrId.split('#');
        user = bot.users.cache.find(u => u.username === username && u.discriminator === discriminator);
      }

      // If user still not found by username and discriminator or username is provided without discriminator, try fetching by username only
      if (!user && !usernameOrId.includes('#')) {
        user = bot.users.cache.find(u => u.username === usernameOrId);
      }

      // If user still not found, return
      if (!user) {
        return message.channel.send("User not found.");
      }

      // Check if the user has an avatar
      if (!user.avatar) return message.channel.send("User does not have an avatar.");

      // Get the highest quality format of the user's avatar
      const format = user.avatar.startsWith("a_") ? "gif" : "png";
      const url = user.avatarURL({ format: format, dynamic: true, size: 4096 });

      // Create an embed with the user's avatar
      const avtEmbed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 0xFFFFFF))
        .setTitle(`${user.username}'s Avatar`)
        .setURL(url)
        .setImage(url)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }));

      // Send the embed to the message channel
      message.channel.send(avtEmbed);
    } catch (err) {
      // Handle any errors that may occur
      console.error(err);
      message.channel.send(`An error occurred while fetching the user's avatar.`);
    }
  }
};