const Discord = require('discord.js');
const axios = require("axios");

module.exports = {
  help: {
    name: "banner",
    description: "Get the banner and accent color of a user.",
    usage: "banner <user_id>",
    example: "banner 1234567890"
  },

  conf: {
    aliases: [],
  },

  run: async (bot, message, args, commandName) => {
    // Get the user id from the arguments or the message author
    let avatar = args || message.author.id;

    // Check if the message mentions a user and use their id instead
    if (message.mentions.users.first()) {
      avatar = message.mentions.users.first().id;
    }

    // Validate the user id using a regular expression for snowflakes
    const snowflakeRegex = /^\d{17,19}$/;
    if (!snowflakeRegex.test(avatar)) {
      return await message.channel.send(`You must provide a valid user id.`);
    }

    try {
      // Fetch the user from the bot cache
      let user = await bot.users.fetch(avatar);

      // Fetch the user data from the Discord API using axios
      let response = await axios.get(`https://discord.com/api/v8/users/${user.id}`, {
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
        },
      });

      // Destructure the banner and accent color properties from the response data
      const { banner, accent_color } = response.data;

      // Check if the user has a banner
      if (banner) {
        // Determine the extension of the banner based on whether it is animated or not
        const extension = banner.startsWith("a_")
          ? ".gif?size=1024"
          : ".png?size=1024";

        // Construct the url of the banner using the user id and the banner hash
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;

        // Create an embed with the banner image, title, url, color and footer
        let embed = new Discord.MessageEmbed()
          .setColor(accent_color || "RANDOM")
          .setTitle(`${user.username}'s Banner`)
          .setURL(url)
          .setImage(url)
          .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true, size: 1024 }));

        // Send the embed to the message channel
        await message.channel.send(embed);
      } else {
        // Check if the user has an accent color
        if (accent_color) {
          // Create an embed with a description, color and footer
          let embed = new Discord.MessageEmbed()
            .setDescription(
              `${user.tag} doesn't have a banner but they have an accent color`
            )
            .setColor(accent_color)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true, size: 1024 }));

          // Send the embed to the message channel
          await message.channel.send(embed);
        } else {
          // Create an embed with a description, random color and footer
          let embed = new Discord.MessageEmbed()
            .setDescription(
              `${user.tag} doesn't have a banner nor accent_color!`
            )
            .setColor("RANDOM")
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true, size: 1024 }));

          // Send the embed to the message channel
          await message.channel.send(embed);
        }
      }
    } catch (err) {
      // Log the error to the console
      console.error(err);
      // Send a friendly error message to the message channel
      await message.channel.send(`Something went wrong. Please try again later.`);
    }
  }
};
