const Discord = require("discord.js")
 require("events").EventEmitter.defaultMaxListeners = 200;
   nsfwBot = require("./handler/Client.js"),
  client = new nsfwBot(),
  config = require('./config.json');

require("discord-buttons")(client);
require("./handler/Module.js")(client);
require("./handler/Event.js")(client);
client.on("warn", console.warn); // This will warn you via logs if there was something wrong with your bot.
client.on("error", console.error); // This will send you an error message via logs if there was something missing with your coding.
const dotenv = require('dotenv');
client.login(process.env.TOKEN).catch(console.error); // This token will leads to the .env file. It's safe in there.
let status;
status = ["-help", "where.. am.. I....."];
var avions = ["WATCHING", "STREAMING", "PLAYING", "LISTENING"];
client.on("ready", () => {
  console.log("Ok it works!!!");
  var randt = avions[Math.floor(Math.random() * avions.length)];
  var randstatus = status[Math.floor(Math.random() * status.length)];
  client.user
    .setActivity(randstatus, {
      type: randt,
      url: "https://www.twitch.tv/hey/game/creative",
    })
    .catch(console.error);
30000});

const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(50)


//////////
/*let restartCount = 0;

client.on('ready', () => {
  restartCount++;

  const embed = new Discord.MessageEmbed()
    .setTitle('Bot Restarted')
    .setDescription(`The bot has restarted ${restartCount} times.`)
    .setColor('#RANDOM');

  const channel = client.channels.cache.get('1125902820709761106');
  channel.send(embed);
});

client.on('reconnect', () => {
  // Increment the restart count
  restartCount++;
});*/
/////////////
// Import the fs module
/*const fs = require("fs");

// Read the restart count from the file or set it to 0 if the file does not exist
let restartCount = 0;
try {
  restartCount = JSON.parse(fs.readFileSync("restartCount.json"));
} catch (error) {
  console.log("Failed to read the restart count from the file!");
}

client.on('ready', () => {
  // Increment the restart count
  restartCount++;

  // Write the restart count to the file
  try {
    fs.writeFileSync("restartCount.json", JSON.stringify(restartCount));
  } catch (error) {
    console.log("Failed to write the restart count to the file!");
  }

  // Create an embed with the restart count and the bot's uptime
  const embed = new Discord.MessageEmbed()
    .setTitle('Bot Restarted')
    .setDescription(`The bot has restarted ${restartCount} times.\nUptime: ${client.uptime / 1000} seconds.`)
    .setColor('#RANDOM');

  // Get the channel by its ID and send the embed
  const channel = client.channels.cache.get('1125902820709761106');
  if (channel) {
    channel.send(embed);
  } else {
    console.log("Failed to find the channel!");
  }
});

client.on('reconnect', () => {
  // Increment the restart count
  restartCount++;

  // Write the restart count to the file
  try {
    fs.writeFileSync("restartCount.json", JSON.stringify(restartCount));
  } catch (error) {
    console.log("Failed to write the restart count to the file!");
  }
});*/

////////////
/*// Import the fs module
const fs = require("fs");

// Read the restart count from the file or set it to 0 if the file does not exist
let restartCount = 0;
try {
  restartCount = JSON.parse(fs.readFileSync("restartCount.json"));
} catch (error) {
  console.log("Failed to read the restart count from the file!");
}

// Define a function to format the uptime
function formatUptime(uptime) {
  // Get the hours, minutes and seconds from the uptime in milliseconds
  let hours = Math.floor(uptime / (1000 * 60 * 60));
  let minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((uptime % (1000 * 60)) / 1000);

  // Return a string with the formatted uptime
  return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds ? seconds + "s" : ""}`;
}

client.on('ready', () => {
  // Increment the restart count
  restartCount++;

  // Write the restart count to the file
  try {
    fs.writeFileSync("restartCount.json", JSON.stringify(restartCount));
  } catch (error) {
    console.log("Failed to write the restart count to the file!");
  }

  // Create an embed with the restart count and the bot's uptime
  const embed = new Discord.MessageEmbed()
    .setTitle('Bot Restarted')
    .setDescription(`The bot has restarted ${restartCount} times.\nUptime: ${formatUptime(client.uptime)}.`)
    .setColor('#RANDOM');

  // Get the channel by its ID and send the embed
  const channel = client.channels.cache.get('1125902820709761106');
  if (channel) {
    channel.send(embed).then(message => {
      // Update the uptime every minute
      setInterval(() => {
        embed.setDescription(`The bot has restarted ${restartCount} times.\nUptime: ${formatUptime(client.uptime)}.`);
        message.edit(embed);
      }, 60000);
    });
  } else {
    console.log("Failed to find the channel!");
  }
});

client.on('reconnect', () => {
  // Increment the restart count
  restartCount++;

  // Write the restart count to the file
  try {
    fs.writeFileSync("restartCount.json", JSON.stringify(restartCount));
  } catch (error) {
    console.log("Failed to write the restart count to the file!");
  }
});

// Define a command handler for the reset command
client.on('message', message => {
  // Check if the message is the reset command and the author has the admin role
  if (message.content === '-reset' && message.member.roles.cache.has('854833833421570078')) {
    // Reset the restart count to 0
    restartCount = 0;

    // Write the restart count to the file
    try {
      fs.writeFileSync("restartCount.json", JSON.stringify(restartCount));
    } catch (error) {
      console.log("Failed to write the restart count to the file!");
    }

    // Send a confirmation message
    message.channel.send('Restart count has been reset.');
  }
});
*/
//////////
const fs = require("fs");
const { fork } = require("child_process");
 

const owner = "665531752361754644";
const restartFilePath = "restartCount.json";
const restartRoleID = "854833833421570078";
const channelID = "1125902820709761106";

// Read the restart count from the file
function readRestartCount() {
  return new Promise((resolve, reject) => {
    fs.readFile(restartFilePath, (error, data) => {
      if (error) {
        console.log("Failed to read the restart count from the file!");
        resolve(0); // Default to 0 on error
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Format uptime to a readable string
function formatUptime(uptime) {
  const hours = Math.floor(uptime / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
  return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds ? seconds + "s" : ""}`;
}

// Update the restart count in the file
function updateRestartCount(restartCount) {
  restartCount++;
  return new Promise((resolve, reject) => {
    fs.writeFile(restartFilePath, JSON.stringify(restartCount), error => {
      if (error) {
        console.log("Failed to write the restart count to the file!");
        reject(error);
      } else {
        resolve(restartCount);
      }
    });
  });
}

client.on('ready', async () => {
  let restartCount = await readRestartCount();
  restartCount = await updateRestartCount(restartCount);

  const embed = new Discord.MessageEmbed()
    .setTitle('Client Restarted')
    .setDescription(`The client has restarted ${restartCount} times.\nUptime: ${formatUptime(client.uptime)}.`)
    .setColor('#RANDOM');

  const channel = client.channels.cache.get(channelID);
  if (channel) {
    const message = await channel.send(embed);
    function updateUptime() {
      embed.setDescription(`The client has restarted ${restartCount} times.\nUptime: ${formatUptime(client.uptime)}.`);
      message.edit(embed);
      setTimeout(updateUptime, 60000);
    }
    updateUptime();
  } else {
    console.log("Failed to find the channel!");
  }
});

client.on('reconnect', async () => {
  let restartCount = await readRestartCount();
  await updateRestartCount(restartCount);
});

client.on('message', async message => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const commandName = args[0];

  if (commandName === '-reset' && message.member.roles.cache.has(restartRoleID)) {
    let restartCount = 0;
    fs.writeFile(restartFilePath, JSON.stringify(restartCount), error => {
      if (error) {
        console.log("Failed to write the restart count to the file!");
      } else {
        message.channel.send('Restart count has been reset.');
      }
    });
  }

  if (commandName === '-restart' && message.author.id === owner) {
    console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("🔄 Client restarting... 🔄");
    console.log("===============================================\n\n");

    try {
      await client.destroy();
      console.log("Client destroyed.");
      
      await client.login(process.env.TOKEN);
      message.channel.send(`Client restarted by ${message.author.username} using ${commandName} command.`);
      console.log("Client successfully restarted.");
      
    } catch (error) {
      console.error(`Failed to restart the client: ${error}`);
    }
  }
});




/////
 
/*var PREFIX = '-';
const ms = require('ms');
const QuickDB = require('quick.db');
const db = new QuickDB.table('timeouts', { table: 'json' });
client.on('message', async message => {
    if (!message.content.startsWith(PREFIX) || message.content.split(" ").length < 3) return;

    let [command, user, timeArg] = message.content.slice(PREFIX.length).split(" ");
    if (command !== "seterror") return;

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.reply("You don't have permission to use this command!");
    }

    let person = message.mentions.members.first() || message.guild.members.cache.get(user);
    if (!person) {
        return message.reply("You need to specify a valid user!");
    }

    let time = ms(timeArg);
    if (!time) {
        return message.reply("You need to specify a valid time!");
    }

    let mainRole = await getOrCreateRole(message.guild, "Main", {
        permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "SPEAK"],
    });

    let errorRole = await getOrCreateRole(message.guild, "Error", {
        permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        deny: ["READ_MESSAGE_HISTORY", "SPEAK"],
    });

    try {
        await person.roles.remove(mainRole);
        await person.roles.add(errorRole);
        const timeoutEnd = Date.now() + time;
        db.set(person.id, timeoutEnd);
        message.channel.send(`Successfully set ${person.user.tag} as error for ${ms(time, { long: true })}`);

        // Schedule timeout removal
        scheduleTimeoutRemoval(person, mainRole, errorRole, timeoutEnd, message);
    } catch (error) {
        return message.reply(`Failed to set ${person.user.tag} as error!`);
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Check for pending timeouts
    const allTimeouts = db.all();
    for (const record of allTimeouts) {
        const personId = record.ID;
        const timeoutEnd = record.data;
        const guild = client.guilds.cache.first(); // Assuming single guild
        const person = await guild.members.fetch(personId);

        if (person && Date.now() < timeoutEnd) {
            const mainRole = await getOrCreateRole(guild, "Main", {
                permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "SPEAK"],
            });

            const errorRole = await getOrCreateRole(guild, "Error", {
                permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                deny: ["READ_MESSAGE_HISTORY", "SPEAK"],
            });

            // Ensure roles are correctly set in case of bot restart
            if (!person.roles.cache.has(errorRole.id)) {
                await person.roles.remove(mainRole);
                await person.roles.add(errorRole);
            }

            // Schedule remaining timeout
            const remainingTime = timeoutEnd - Date.now();
            scheduleTimeoutRemoval(person, mainRole, errorRole, timeoutEnd, null);
        } else {
            db.delete(personId);
        }
    }
});

async function scheduleTimeoutRemoval(person, mainRole, errorRole, timeoutEnd, message) {
    setTimeout(async () => {
        try {
            await person.roles.add(mainRole);
            await person.roles.remove(errorRole);
            db.delete(person.id);

            if (message) {
                let embed = new MessageEmbed()
                    .setDescription(`@${person.user.tag} timed out so I removed their error role`);
                message.channel.send(embed);
            }
        } catch (error) {
            if (message) {
                message.reply(`Failed to remove ${person.user.tag}'s error role!`);
            }
        }
    }, timeoutEnd - Date.now());
}

async function getOrCreateRole(guild, name, options) {
    let role = guild.roles.cache.find(role => role.name === name);
    if (role) return role;

    try {
        role = await guild.roles.create({ data: { name, ...options } });
        return role;
    } catch (error) {
        throw new Error(`Failed to create the "${name}" role!`);
    }
}
*/
 
///////////
// Define a constant variable for the prefix

// Declare a variable to store the timeout reference
/*t timeout;

// Declare a variable to store the sendChunk function
let sendChunk;

client.on('ready', async () => {
  const channelId = '790218273500168245'; // The ID of the channel you want to fetch messages from.

  // Fetch the channel object from the API
  const channel = await client.channels.fetch(channelId);

  // Initialize an empty array to store the messages
  let messages = [];

  // Fetch the first batch of messages
  let batch = await channel.messages.fetch({ limit: 100 });

  // Loop until there are no more messages to fetch
  while (batch.size > 0) {
    // Add the batch of messages to the array
    messages = messages.concat(batch.array());

    // Fetch the next batch of messages using the last message ID as the before option
    batch = await channel.messages.fetch({ limit: 100, before: batch.last().id });
  }

  // Map the messages to an array of strings containing the user's tag, the date and time, and the message content
  const contents = messages.map(message => `${message.author.tag} (${message.createdAt.toLocaleString()}): ${message.content}`);

  // Get the channel object where you want to send the messages
  const outputChannelId = '1126251981560873070'; // The ID of the channel where you want to send the messages.
  const outputChannel = await client.channels.fetch(outputChannelId);

  // Send a message indicating that you fetched all messages from the channel
  outputChannel.send('Fetched all messages from channel:');

  // A function that splits an array into smaller arrays of a given size
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  // Split the contents array into chunks of 10 messages each
  const chunks = chunkArray(contents, 10);

  // Initialize a variable to keep track of the current chunk index
  let i = 0;

  // Define a function that sends a chunk to the output channel and increments the index
sendChunk = function() {
  // Check if the index is within the bounds of the chunks array
  if (i < chunks.length) {
    // Get the current chunk
    const chunk = chunks[i];

    outputChannel.send('```\n' + chunk.join('\n') + '\n```');

    i++;
    timeout = setTimeout(sendChunk, 10000);
    console.log('Timeout set:', timeout);
    // Return the timeout reference
    return timeout;
  }
}

// Initialize a collection to store the timeout references for each channel
const timeouts = new Map();

client.on('message', async message => {
  
  // Check if the message starts with the prefix and is not from a bot
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  
  // Convert the command to lowercase
  const command = args.shift().toLowerCase();
  
  // Use a switch statement for command handling
  switch (command) {
    case 'start':
      try {
        // Call the sendChunk function and store the timeout reference in the collection
        timeouts.set(message.channel.id, sendChunk());
        message.channel.send('Started fetching messages.');
        console.log('Timeouts:', timeouts);
      } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        message.channel.send('Something went wrong.');
      }
      break;
    case 'stop':
      try {
        // Clear the timeout using the channel ID as the key and delete it from the collection
        clearTimeout(timeouts.get(message.channel.id));
        timeouts.delete(message.channel.id);
        message.channel.send('Stopped fetching messages.');
        console.log('Timeouts:', timeouts);
      } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        message.channel.send('Something went wrong.');
      }
      break;
    default:
      // Handle unknown commands
      message.channel.send('Invalid command.');
      break;
  }})})*/
///////////
/*const logger = require("pino");
client.on("unhandledRejection", async (reason, promise) => {
    try {
        // Log the reason and the promise details to a file
        logger.error("Uncaught exception:", reason);
        logger.error("Promise status:", promise.status);
        logger.error("Promise value:", promise.value);

        // Alternatively, send the exception information to an error tracking service
        // const errorTrackingService = new ErrorTrackingService();
        // errorTrackingService.trackError(reason);

        // Try to recover from the crash
        if (promise.status === "rejected") {
            // Define a constant variable for the bot token, using an environment variable
            // You need to set up the environment variable in your system or in a .env file
            const BOT_TOKEN = process.env.TOKEN;
            // Check if the client is ready before logging in again
            if (!client.readyAt) {
                // Try to log in again and handle any errors
                try {
                    // Use the BOT_TOKEN variable instead of process.env.TOKEN
                    await client.login(BOT_TOKEN);
                } catch (error) {
                    console.error("Error while logging in:", error);
                }
            }
        }
    } catch (error) {
        // Handle any errors that might occur when logging
        console.error("Error while logging unhandled rejection:", error);
    }
});*/
///////
/*const ytdl = require("ytdl-core");
 


 client.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  if (message.content.startsWith(`${PREFIX}dwl`)) {
      const match = message.content.match(REGEX);

      if (!match) {
          await message.channel.send("Please provide a valid YouTube URL or ID.");
          return;
      }

      const shortId = match[1];

     try {
  
  const info = await ytdl.getInfo(shortId);

  if (!info || !info.videoDetails) {
      throw new Error("Invalid video");
  }

  const title = info.videoDetails.title;
  const duration = info.videoDetails.lengthSeconds;

  const formats = ytdl.filterFormats(info.formats, (format) => {
    const size = duration * format.bitrate / 1000;
    return size <= LIMIT * 1000;
  });

  const format = ytdl.chooseFormat(formats, {
    quality: "highestvideo"
  });

  const size = duration * format.bitrate / 8 / 1000;

  let fileName = `${title}.${format.container}`; 

  let i = 1;
  while (fs.existsSync(fileName)) {
      fileName = `${title} (${i}).${format.container}`;
      i++;
  }

  filePath = path.join(__dirname, fileName); 

  await message.channel.send("Downloading video...");

  writeStream = fs.createWriteStream(filePath);// Assign writeStream here

          
  readStream = ytdl.downloadFromInfo(info, { 
      filter: "videoandaudio",
      quality: "highestvideo",
  }).on("error", async (err) => {
              
      console.error(err);
      await message.channel.send(`An error occurred while downloading the video: ${err.message}`);
              
      fs.unlink(filePath, (err) => {
          if (err) console.error(err);
      });
  });

  readStream.pipe(writeStream);

          
  let downloaded = 0;
  let total = 0;
  readStream.on("progress", (chunkLength, downloadedBytes, totalBytes) => {
              
      downloaded += chunkLength;
      total = totalBytes;
              

      const percentage = ((downloaded / total) * 100).toFixed(2);
      const barLength = Math.ceil(percentage / 2);
      const bar = "=".repeat(barLength) + " ".repeat(50 - barLength);
      process.stdout.write(`\r[${bar}] ${percentage}%`);
              
  });

  writeStream.on("finish", async () => {
   
      if (downloaded === total) {
          await message.channel.send(`Video downloaded to ${fileName}`, {
              files: [filePath],
          });

          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
      } else {
          await message.channel.send(`The download was incomplete. Please try again.`);
          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
      }
              
  });
} catch (error) {
          
  console.error(error);
  await message.channel.send("Something went wrong.");
}
  
}

    if (message.content.startsWith(`${PREFIX}cancel`)) {
    
      if (readStream && writeStream) {
         
          readStream.destroy();
          writeStream.destroy();
          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
          
          await message.channel.send("The download was canceled.");
      } else {
          await message.channel.send("There is no active download to cancel.")      
    }
}})
//////////


const REGEX = /(?:https?:\/\/)?(?:www\.)?youtube\.(?:com|be)\/(?:watch\?v=|shorts\/)([a-zA-Z0-9_-]+)/;
const LIMIT = 500; 

let filePath;
let readStream;
let writeStream;
const path = require("path");


let progressMessage;
 
 const ffmpeg = require("fluent-ffmpeg"); 
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;


let info;
let format;

/*client.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  if (message.content.startsWith(`${PREFIX}dcv`)) {
      const match = message.content.match(REGEX);

      if (!match) {
          await message.channel.send("Please provide a valid YouTube URL or ID.");
          return;
      }

      const shortId = match[1];

     try {
  
  const info = await ytdl.getInfo(shortId);

  if (!info || !info.videoDetails) {
      throw new Error("Invalid video");
  }

  const title = info.videoDetails.title;
  const duration = info.videoDetails.lengthSeconds;

  const formats = ytdl.filterFormats(info.formats, (format) => {
    const size = duration * format.bitrate / 1000;
    return size <= LIMIT * 1000;
  });

  const format = ytdl.chooseFormat(formats, {
    quality: "highestaudio" 
  });

  const size = duration * format.bitrate / 8 / 1000;

  let fileName = `${title}.mp3`.replace(/[\/ ]/g, "_");

  let i = 1;
  while (fs.existsSync(fileName)) {
      fileName = `${title} (${i}).mp3`;
      i++;
  }

  filePath = path.join(__dirname, fileName); 

  progressMessage = await message.channel.send("Downloading and converting video..."); // Assign progressMessage here

  writeStream = fs.createWriteStream(filePath); 

          
  readStream = ytdl.downloadFromInfo(info, { 
      filter: "audioonly", 
      quality: "highestaudio",
  }).on("error", async (err) => {
              
      console.error(err);
      await message.channel.send(`An error occurred while downloading the video: ${err.message}`);
              
      fs.unlink(filePath, (err) => {
          if (err) console.error(err);
      });
  });

  
  console.log("Starting ffmpeg conversion...");
ffmpeg(readStream)
  .audioBitrate(320)
  .withAudioCodec("libmp3lame")
  .toFormat("mp3")
  .on("error", async (err) => {
    console.error(err);
    await message.channel.send(
      `An error occurred while converting the video: ${err.message}`
    );

    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
    });
  })
  .pipe(writeStream);
console.log("Finished ffmpeg conversion...");

          
  let downloaded = 0;
  let total = 0;
  readStream.on("progress", async (chunkLength, downloadedBytes, totalBytes) => { 
              
      downloaded += chunkLength;
      total = totalBytes;
              

      const percentage = ((downloaded / total) * 100).toFixed(2);
      const barLength = Math.ceil(percentage / 2);
      const bar = "=".repeat(barLength) + " ".repeat(50 - barLength);
      
      await progressMessage.edit(`Downloading and converting video...\n[${bar}] ${percentage}%`);
              
  });

  writeStream.on("finish", async () => {
   
      if (downloaded === total) {
          await message.channel.send(`Video converted to ${fileName}`, {
              files: [filePath],
          });

          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
      } else {
          await message.channel.send(`The conversion was incomplete. Please try again.`);
          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
      }
              
  });
} catch (error) {
          
  console.error(error);
  await message.channel.send("Something went wrong.");
}
  
}

    if (message.content.startsWith(`${PREFIX}abort`)) {
    
      if (readStream && writeStream) {
         
          readStream.destroy();
          writeStream.destroy();
          fs.unlink(filePath, (err) => {
              if (err) console.error(err);
          });
          
          await message.channel.send("The download and conversion was canceled.");
      } else {
          await message.channel.send("There is no active download or conversion to cancel.")      
    }
}})*/
/////// 
const prefix = "-"

const cooldownFile = './cooldown.json';
let cooldownDuration = 10000;
let timeout;
let i = 0;
let outputTxt;
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

let sendChunk;

const loadChannelIds = () => {
  try {
    const data = fs.readFileSync('channelIds.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
}

const saveChannelIds = channelIds => {
  try {
    const data = JSON.stringify(channelIds, null, 2);
    fs.writeFileSync('channelIds.json', data, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

let channelIds = loadChannelIds();
let channelId = channelIds.input || 'default input channel id';
let outputChannelId = channelIds.output || 'default output channel id';

const setChannelId = newChannelId => {
  channelId = newChannelId;
  channelIds.input = newChannelId;
  saveChannelIds(channelIds);
}

const setOutputChannelId = newOutputChannelId => {
  outputChannelId = newOutputChannelId;
  channelIds.output = newOutputChannelId;
  saveChannelIds(channelIds);
}

client.on('ready', () => {
});

client.on('message', async message => {
  const { content, channel } = message;
  const [command, ...args] = content.slice(prefix.length).trim().split(' ').map(arg => arg.toLowerCase());

  if (message.author.bot) return;

  switch (command) {
    case 'start':
      const outputChannel = await client.channels.fetch(outputChannelId);
      const sourceChannel = await client.channels.fetch(channelId);

      const messages = await sourceChannel.messages.fetch({ limit: 5 });

      const filteredMessages = messages.filter(message => message.content && message.embeds.length === 0);
      const contents = filteredMessages.map(message => `${message.author.tag} (${message.createdAt.toLocaleString()}): ${message.content}`);
      const attachments = filteredMessages.map(message => message.attachments).flat();
      const attachmentUrls = attachments.map(attachment => attachment.url);
      contents.push(...attachmentUrls);
      const chunks = chunkArray(contents, 1);

      sendChunk = () => {
        if (i < chunks.length) {
          const chunk = chunks[i];
          outputTxt = `\n${chunk.join('\n')}\n`;
          if (outputTxt.trim().length > 0) {
            outputChannel.send(outputTxt);
          }
          i++;
          timeout = setTimeout(sendChunk, cooldownDuration);
        }
      };

      sendChunk();
      channel.send('Started sending chunks.');
      break;
    case 'stop':
      clearTimeout(timeout);
      channel.send('Stopped sending chunks.');
      break;
    case 'setchannel':
      setChannelId(args[0]);
    case 'setoutputchannel':
      setOutputChannelId(args[0]);
      break;
    case 'setcooldown':
      isNaN(args[0]) ? channel.send('Please enter a valid number for the cooldown.') : cooldownDuration = args[0] * 1000;

      channel.send(`The new cooldown for fetching messages is ${args[0]} seconds.`);
      break;
    case 'showcooldown':
      outputTxt = `The current cooldown for fetching messages is ${cooldownDuration / 1000} seconds.`;
      if (outputTxt.trim().length > 0) {
        channel.send(outputTxt);
      }
      break;
    case 'setupchannelid':
      setChannelId(args[0]);
      setOutputChannelId(args[1]);
      outputTxt = `The new input channel id is ${args[0]}.`;
      if (outputTxt.trim().length > 0) {
        channel.send(outputTxt);
      }
      outputTxt = `The new output channel id is ${args[1]}.`;
      if (outputTxt.trim().length > 0) {
        channel.send(outputTxt);
      }
      
      break;
    case 'ch-settings':
      const inputChannelName = (await client.channels.fetch(channelId)).name;
      const outputChannelName = (await client.channels.fetch(outputChannelId)).name;
      
      outputTxt = `The current input channel is ${inputChannelName} (${channelId}).`;
      
       if (outputTxt.trim().length > 0) {
        channel.send(outputTxt);
       }
       
       outputTxt= `The current output channel is ${outputChannelName} (${outputChannelId}).`;
       
       if (outputTxt.trim().length > 0) {
        channel.send(outputTxt);
       }
       
      break;

  }
});
/////////
/*const axios = require("axios");
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Encode them in base64
const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

// Define the options for the request
const options = {
  url: "https://accounts.spotify.com/api/token", // The endpoint to get the token
  method: "POST", // The HTTP method
  headers: {
    Authorization: `Basic ${credentials}`, // The authorization header with the encoded credentials
    "Content-Type": "application/x-www-form-urlencoded", // The content type header
  },
  data: "grant_type=client_credentials", // The request body parameter as a string
};

// Send the request and handle the response
axios(options)
  .then((response) => {
    // If the request was successful, get the access token from the response data
    const accessToken = response.data.access_token;

    // Do something with the access token, such as saving it or using it for API requests
    console.log(accessToken);
  })
  .catch((error) => {
    // If there was an error, log it and exit
    console.error(error);
  });*/
//////
 
// Import modules.
// Import the modules
/*const Spotify = require("spotify-web-api-node");
const { exec } = require("child_process");
const spotdl = ("spotdl")
// Create a Discord client

// Create a Spotify client with credentials from environment variables.
const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Set the access token for Spotify from environment variable.
spotify.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

// Create an empty collection for your commands
const commands = new Discord.Collection();

// Create a command object for the download command
const downloadCommand = {
  name: "download",
  description: "Download a track from Spotify by ID or query",
  execute: async (message, args) => {
    // Check if the user provided a track ID or a query.
    if (!args[0]) {
      return message.reply(
        "Please provide a track ID or a query to search for a track."
      );
    }

    // Check if the argument is a valid track ID.
    const trackIdRegex = /^[\w-]{22}$/;
    const isTrackId = trackIdRegex.test(args[0]);

    try {
      let track;

      if (isTrackId) {
        // Get the track from Spotify by ID.
        track = await spotify.getTrack(args[0]);
      } else {
        // Search for the track on Spotify by query.
        const query = args.join(" ");
        const results = await spotify.searchTracks(query);

        // Check if there are any results.
        if (!results.body.tracks.items.length) {
          return message.reply("No tracks found for that query.");
        }

        // Get the first result.
        track = results.body.tracks.items[0];
      }

      // Get the track object from the track variable
      const trackObject = track.body;

      // Create a command to download the track by ID using spotify-downloader
      const command = `spotdl --song https://open.spotify.com/track/${trackObject.id}`;

      // Execute the command and handle the output
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          message.reply("Something went wrong. Please try again later.");
        } else {
          // Get the name of the mp3 file from the output
          const fileName = stdout.match(/Converting (.+) to mp3/)[1];

          // Send the mp3 file to the user along with some information about the track using template literals
          message.channel.send(
            `Here is your download link for ${trackObject.name} by ${trackObject.artists
              .map((artist) => artist.name)
              .join(", ")}`,
            {
              files: [fileName],
            }
          );
        }
      });
    } catch (error) {
      // Handle any errors that may occur.
      console.error(error);
      message.reply("Something went wrong. Please try again later.");
    }
  },
};

// Create a command object for the help command
const helpCommand = {
  name: "help",
  description: "Show some instructions on how to use the bot",
  execute: async (message, args) => {
    // Send a help message with some instructions on how to use the bot using template literals.
    await message.channel.send(
      `Hello, I am a bot that can download Spotify tracks for you. To use me, you can either provide a track ID or a query to search for a track. For example:\n
!downloadTrack 4uKFDMprclQgdQWzPfkDxP
!downloadTrack Never Gonna Give You Up\n
You can find the track ID by right-clicking on a track on Spotify and selecting "Share" -> "Copy Spotify URI".`
    );
  },
};

// Add the command objects to the collection
commands.set(downloadCommand.name, downloadCommand);
commands.set(helpCommand.name, helpCommand);

// Listen for messages on Discord.
client.on("message", async (message) => {
  // Ignore messages that are not commands or are from other bots.
  if (!message.content.startsWith("!") || message.author.bot) return;

  // Get the command name and arguments from the message.
  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Get the command object from the collection by name
  const command = commands.get(commandName);

  // Check if the command exists
  if (!command) return;

  // Execute the command with the message and arguments
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});
*/
////////////
/*const disbut = require('discord-buttons');
disbut  
 
const unbanRequestChannelID = '1128709813279400017';
const buttonMessageChannelID = '1125902820709761106';
const logChannelID = '1128569122503012452';

const unbanRequests = new Discord.Collection();
const staffSequence = [];

let currentIndex = 0;
const staffSequencePath = 'staffSequence.json';

client.on('ready', async () => {
  const buttonMessageChannel = client.channels.cache.get(buttonMessageChannelID);
  if (!buttonMessageChannel) return console.error('The button message channel ID is invalid or not found.');
  try {
    const data = await fs.promises.readFile('buttonMessage.json', 'utf8');
    const buttonMessageID = JSON.parse(data).id;
    if (!buttonMessageID) return console.error('The button message ID is missing or invalid.');
    const buttonMessage = await buttonMessageChannel.messages.fetch(buttonMessageID);
    if (!buttonMessage.components[0].components[0]) return console.error('The button message does not have a button component.');
// Define a variable for the ID of the last unban request channel
let lastUnbanRequestChannelID = null;

client.on('clickButton', async button => {
  if (button.id !== 'unban_request' && button.id !== 'close_unban_request') return;
  await button.reply.defer();
  const buttonComponent = button.message.components[0].components[0];
  if (!buttonComponent) return console.error('The button component is missing or invalid.');
  if (button.id === 'unban_request') {
    if (unbanRequests.has(button.clicker.user.id)) return button.reply.send('You already have an unban request channel. Please check your DMs for the link.', true);
    const channel = await button.message.guild.channels.create(`${button.clicker.user.toString()}-unban-request`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: button.message.guild.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: button.clicker.user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }
      ]
    });
    const closeButton = new disbut.MessageButton()
      .setStyle('red')
      .setLabel('Close Unban Request')
      .setID('close_unban_request');
    // Read the staff sequence file and parse it
    fs.readFile(staffSequencePath, 'utf8', (err, data) => {
      if (err) return console.error(err);
      const staffSequence = JSON.parse(data);
      // Get the staff name from the staff sequence array
      const staffName = staffSequence[currentIndex];
      channel.send(`Hello ${button.clicker.user.toString()}, this is your unban request channel. Please provide your in-game username and explain why you should be unbanned and wait for a staff member to review your case. ${staffName ? `Welcome, ${staffName} or someone of higher rank will come to help you as soon as possible. Until then be patient please.` : ''}`, { buttons: [closeButton] });
      unbanRequests.set(button.clicker.user.id, channel.id);
      // Removed the line below
      // button.reply.edit('Your unban request channel has been created. Please check your DMs for the link. 📩');
      const unbanRequestChannel = button.message.guild.channels.cache.get(unbanRequestChannelID);
      if (unbanRequestChannel) {
        unbanRequestChannel.send(`${button.clicker.user.toString()}'s Unban Request has been created.`);
      }

      // Assign the ID of the new unban request channel to the variable
      lastUnbanRequestChannelID = channel.id;
    });
  } 
  if (button.id === 'close_unban_request') {
    const logChannel = client.channels.cache.get(logChannelID);
    if (!logChannel) return console.error('The log channel ID is invalid or not found.');
    const messages = await button.message.channel.messages.fetch({ limit: 100 });
    const messagesText = messages.map(m => `${m.author.tag}: ${m.content}`).join('\n');
    await fs.promises.writeFile(`${button.message.channel.name}.txt`, messagesText, 'utf8');
    await logChannel.send({ content: `Here is the log of ${button.message.channel.name}`, files: [`${button.message.channel.name}.txt`] });
    await fs.promises.unlink(`${button.message.channel.name}.txt`);
    await button.message.channel.delete();
    unbanRequests.delete(button.clicker.user.id);
    button.reply.edit('Your unban request channel has been closed. Thank you for your cooperation. 👍');
    const unbanRequestChannel = button.message.guild.channels.cache.get(unbanRequestChannelID);
    if (unbanRequestChannel) {
      unbanRequestChannel.send(`${button.clicker.user.toString()}'s Unban Request has been closed.`);
    }

    // Check if the ID of the closed unban request channel matches the variable
    // If so, move to the next person in the staff sequence
    if (button.message.channel.id === lastUnbanRequestChannelID) {
      currentIndex = (currentIndex + 1) % staffSequence.length;
    }
  }
});

  } catch (err) {
    console.error(err);
  }
});

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'addbutton') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You don\'t have permission to add buttons. ❌');

    const messageID = args[0];
    if (!messageID) return message.reply('Please provide a valid message ID. 🆔');

    const buttonMessageChannel = client.channels.cache.get(buttonMessageChannelID);
    if (!buttonMessageChannel) return console.error('The button message channel ID is invalid or not found.');
    try {
      const buttonMessage = await buttonMessageChannel.messages.fetch(messageID);
      if (!buttonMessage) return message.reply('No message found with that ID. 🔍');

      const button = new disbut.MessageButton()
        .setStyle('green')
        .setLabel('Click here to create an unban request')
        .setID('unban_request');

      await buttonMessage.edit(buttonMessage.content, { buttons: [button] });
      await fs.promises.writeFile('buttonMessage.json', JSON.stringify({ id: messageID }), 'utf8');
      message.reply(`The button has been added. ✅`);
    } catch (err) {
      console.error(err);
      message.reply('Something went wrong. Please try again later. 😥');
    }
  }
if (command === 'staff-sequence') {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You don\'t have permission to manage the staff sequence. ❌');

  const subcommand = args[0];
  const staffName = args.slice(1).join(' ');

  if (!subcommand) return message.reply('Please provide a valid subcommand: add, remove or list. 📋');

  if (subcommand === 'add') {

    if (!staffName) return message.reply('Please provide a valid staff name. 📛');

    // Read the staff sequence file and parse it
    fs.readFile(staffSequencePath, 'utf8', (err, data) => {
      if (err) return console.error(err);
      try {
        const staffSequence = JSON.parse(data);

        if (staffSequence.includes(staffName)) return message.reply('That staff name is already in the sequence. 🔄');

        // Add the staff name to the staff sequence array
        staffSequence.push(staffName);

        // Stringify the staff sequence array and write it back to the file
        fs.writeFile(staffSequencePath, JSON.stringify(staffSequence), 'utf8', (err) => {
          if (err) return console.error(err);
          message.reply(`The staff name ${staffName} has been added to the sequence. ➕`);
        });
      } catch (err) {
        // Handle any JSON parsing errors
        console.error(err);
      }
    });
  }

    if (subcommand === 'remove') {

      if (!staffName) return message.reply('Please provide a valid staff name. 📛');

      // Read the staff sequence file and parse it
      fs.readFile(staffSequencePath, 'utf8', (err, data) => {
        if (err) return console.error(err);
        const staffSequence = JSON.parse(data);

        if (!staffSequence.includes(staffName)) return message.reply('That staff name is not in the sequence. ❓');

        // Remove the staff name from the staff sequence array
        const index = staffSequence.indexOf(staffName);
        staffSequence.splice(index, 1);

        // Adjust the current index accordingly
        if (index < currentIndex) {
          currentIndex--;
        }

        // Stringify the staff sequence array and write it back to the file
        fs.writeFile(staffSequencePath, JSON.stringify(staffSequence), 'utf8', (err) => {
          if (err) return console.error(err);
          message.reply(`The staff name ${staffName} has been removed from the sequence. ➖`);
        });
      });
    }

if (subcommand === 'list') {
  // Read the staff sequence file and parse it
  fs.readFile(staffSequencePath, 'utf8', (err, data) => {
    if (err) return console.error(err);
    const staffSequence = JSON.parse(data);

    // Check if the sequence is empty
    if (staffSequence.length === 0) return message.reply('The sequence is empty. 🗑️');

    // Concatenate the staff names into one string
   let sequenceString = '';
    for (let i = 0; i < staffSequence.length; i++) {
      // Get the staff name from the array
      const staffName = staffSequence[i];
      // Get the current person from the array
      const currentPerson = staffSequence[currentIndex];
      // Check if the staff name matches the current person
      // If so, add the "(Current)" text to the sequence string
      // Otherwise, just add the staff name to the sequence string
      sequenceString += staffName === currentPerson ? `${i + 1}. ${staffName} (Current)\n` : `${i + 1}. ${staffName}\n`;
    }
       

        const embed = new Discord.MessageEmbed()
          .setTitle('Staff Sequence')
          .setDescription(sequenceString)
          .setFooter(`Current index: ${currentIndex + 1}`);
        
        message.reply(embed); // This is missing a semicolon
      }
    
)}}})*/
////////////////
/*
function formatTable(array) {
  // Initialize an empty string for the table
  let table = '';
  // Loop through each row of the array
  for (let row of array) {
    // Add a separator line to the table
    table += '|';
    // Loop through each element of the row
    for (let element of row) {
      // Add the element and a separator to the table
      table += element + '|';
    }
    // Add a newline to the table
    table += '\n';
  }
  // Return the table
  return table;
}

// Define a function to format a 3D array into spreadsheet-like boxes
function formatSpreadsheet(array) {
  // Initialize an empty string for the spreadsheet
  let spreadsheet = '';
  // Loop through each sheet of the array
  for (let sheet of array) {
    // Add a code block start to the spreadsheet
    spreadsheet += '```';
    // Add the formatted table of the sheet to the spreadsheet
    spreadsheet += formatTable(sheet);
    // Add a code block end to the spreadsheet
    spreadsheet += '```\n';
  }
  // Return the spreadsheet
  return spreadsheet;
}

// Define a sample 3D array
const table1 = [
["Account ID", "Name", "Actions", "Discord ID"],
["54215", "Someone", "696969","1245679768989468"],
["125", "Cupcake", "46543","6234623462366234623"],
["4132434", "Icecream", "42","262362346234623"],
["546641", "Soda", "69","2727725725457457"],
["34134", "Burger", "3164654","725752757753457"],
["15252", "Donut", "546","65856875756356"],
];

// Initialize an empty string for the output
let output = '';

// Define a separator variable
let sep = '|';

// Define a newline variable
let nl = '\n';

// Loop through each row of the array
for (let i = 0; i < table.length; i++) {
  // Get the current row
  let row = table[i];
  // Add a separator to the output
  output += sep;
  // Loop through each element of the row
  for (let j = 0; j < row.length; j++) {
    // Get the current element
    let element = row[j];
    // Add the element and a separator to the output
    output += element + sep;
  }
  // Add a newline to the output
  output += nl;
}


 

// Listen for messages sent to your bot
client.on('message', message => {
  // If the message content is '!spreadsheet', reply with the formatted spreadsheet of the sample array
  if (message.content === '!spreadsheet') {
    message.reply(formatSpreadsheet(table1));
  }
});
 ///////////
const array = [
  [
    ['a1', 'a2', 'a3'],
    ['a4', 'a5', 'a6'],
    ['a7', 'a8', 'a9']
  ],
  [
    ['b1', 'b2', 'b3'],
    ['b4', 'b5', 'b6'],
    ['b7', 'b8', 'b9']
  ],
  [
    ['c1', 'c2', 'c3'],
    ['c4', 'c5', 'c6'],
    ['c7', 'c8', 'c9']
  ]
];

// Define a function to format the array into spreadsheet-like boxes
function formatArray(array) {
  // Initialize an empty string for the output
  let output = '';
  // Loop through the first dimension of the array
  for (let i = 0; i < array.length; i++) {
    // Add a horizontal line to separate the layers
    output += '+---+---+---+\n';
    // Loop through the second dimension of the array
    for (let j = 0; j < array[i].length; j++) {
      // Add a vertical line to start a row
      output += '|';
      // Loop through the third dimension of the array
      for (let k = 0; k < array[i][j].length; k++) {
        // Add the element with a space padding and a vertical line
        output += ` ${array[i][j][k]} |`;
      }
      // Add a newline to end the row
      output += '\n';
    }
  }
  // Add a final horizontal line to close the box
  output += '+---+---+---+\n';
  // Return the output string
  return output;
}

 

// Listen for message event
client.on('message', (message) => {
  // Check if the message is from a user and starts with "!box"
  if (!message.author.bot && message.content.startsWith('!box')) {
    // Format the array into spreadsheet-like boxes
    const output = formatArray(array);
    // Send the output as a code block in Discord
    message.channel.send(`\`\`\`${output}\`\`\``);
  }
});*/
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'test') {
    const array = [
      ["Account ID", "Name", "Actions", "Discord ID"],
      ["54215", "Someone", "696969","1245679768989468"],
      ["125", "Cupcake", "46543","6234623462366234623"],
      ["4132434", "Icecream", "42","262362346234623"],
      ["546641", "Soda", "69","2727725725457457"],
      ["34134", "Burger", "3164654","725752757753457"],
      ["15252", "Donut", "546","65856875756356"],
    ];

    const maxLengths = [];
    for (let i = 0; i < array[0].length; i++) {
      let max = 0;
      for (let j = 0; j < array.length; j++) {
        if (array[j][i].length > max) {
          max = array[j][i].length;
        }
      }
      maxLengths.push(max);
    }

    const formattedArray = array.map(row => {
      return row.map((value, index) => {
        return value.padEnd(maxLengths[index]);
      }).join(" │ ");
    });

    message.channel.send(`\`\`\`\n${formattedArray.join("\n")}\n\`\`\``);
  }
});
/////
// Import the Jimp library
const Jimp = require("jimp");

// Define a function to create a PNG file from a message
const createPNG = async (message) => {
  // Get the message content, author and timestamp
  const content = message.content;
  const author = message.author.username;
  const timestamp = message.createdAt.toLocaleString();

  // Load the background image and the font
  const background = await Jimp.read("https://cdn.discordapp.com/attachments/1125902820709761106/1131676365524041739/OIG.png");
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  // Create a new image with the same size as the background
  const image = new Jimp(background.bitmap.width, background.bitmap.height);

  // Composite the background on the image
  image.composite(background, 0, 0);

  // Write the author name on the center of the image
  image.print(font, image.bitmap.width / 2 - 50, image.bitmap.height / 2 - 10, author);

  // Write the message content on the bottom left corner
  image.print(font, 10, image.bitmap.height - 30, content);

  // Write the timestamp on the bottom right corner
  image.print(
    font,
    image.bitmap.width - 150,
    image.bitmap.height - 30,
    timestamp
  );

  // Return the image as a buffer
  return await image.getBufferAsync(Jimp.MIME_PNG);
};

client.on("message", async (message) => {
  // Check if the message contains a ping to the specific user
  const mentionedUsers = message.mentions.users;
  if (mentionedUsers.size === 1 && mentionedUsers.first().id === "433538108982558730") {
    // Create a PNG file from the message
    const png = await createPNG(message);

    // Send the PNG file to your DMs
    await client.channels.cache.get("1125902820709761106").send({ files: [png] });
  }
});
///////

client.on('message', message => {
  // If the message is "hello"
  if (message.content === 'hello') {
    // Create a string with "hello" repeated 5000 times
    let helloString = 'hello'.repeat(5000);
    // Send the string as a message
    message.channel.send(helloString);
  }
});





/*const { Client, WebhookClient } = require("discord.js");
const { createError } = require("util");
console.testMode = false;

const channelID = "1131692189240545451";
// Use environment variables or a config file to store your webhook ID and token
const webhookID = process.env.WEBHOOK_ID;
const webhookToken = process.env.WEBHOOK_TOKEN;

// Pass an object with the id and token properties to the WebhookClient constructor
const webhook = new WebhookClient({ id: webhookID, token: webhookToken });

// Set up error logging
console.error = async (error) => {
  // Create a formatted error message using the util module
  const message = createError(error).stack;
  // Check if the webhook is valid
  try {
    await webhook.fetch();
    // Send the error to the webhook
    await webhook.send({
      content: message,
    }).catch((err) => {
      // Handle any errors that may occur when sending messages to the webhook
      console.log(`Failed to send error to webhook: ${err.message}`);
    });
  } catch (err) {
    // Handle any errors that may occur when fetching the webhook
    console.log(`Invalid webhook: ${err.message}`);
  }
};

// Use a constant variable for the interval time
const INTERVAL_TIME = 10000;
// Clear the error history every 10 seconds
let interval = setInterval(() => {
  console.error.history = [];
}, INTERVAL_TIME);

 

// Listen for ready event and access the console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  // Get the channel by ID
  const channel = client.channels.cache.get(channelID);
  // If the channel exists, send a message that the bot is online
  if (channel) {
    channel.send("Bot is online!");
  }
  // Send a message to the webhook
  webhook.send({
    content: "Smartypants",
  }).catch(console.error);
});

// Listen for error event and handle any errors that may occur with the client
client.on("error", (error) => {
  console.error(error);
});

// Clear the interval when the bot is destroyed
client.on("destroy", () => {
  clearInterval(interval);
});
*/
const util = require('util');
const vm = require('vm');

// Create a new client instance
 
// Define a channel ID where the bot will send logs and errors
/*const logChannelID1 = '1128569122503012452';

// Define a test mode variable that can be toggled on or off
console.testMode = false;

// Create a function that logs a message to the console or the log channel
let logErrors = false;

// Create a function that logs a message to the console or the log channel
function log(message) {
  if (console.testMode) {
    console.log(message);
  }
  else if (logErrors) {
    const logChannel = client.channels.cache.get(logChannelID);
    if (logChannel) {
      logChannel.send(message);
    }
    else {
      console.error('Log channel not found');
    }
  }
}

function handleError(error, source) {
  const prefix = `[${source}]`;
  // create an embed object for the error message
  const errorEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Got An Error')
    .setDescription(error.message)
    .addField('Stack Trace', error.stack)
    .setTimestamp()
    .setFooter('Code Error');
  // send the embed object to the webhook or the channel
  log(`${prefix} ${error.message}\n${error.stack}`);
  if (webhook) {
    webhook.send({
    //  content: `${prefix} ${util.format(error)}`,
      embeds: [errorEmbed]
    }).catch((err) => {
      console.log(`Failed to send error to webhook: ${err.message}`);
    });
  }
}

process.on('uncaughtException', (error) => {
  handleError(error, 'Uncaught Exception');
});
process.on('unhandledRejection', (error) => {
  handleError(error, 'Unhandled Rejection');
});
client.on('ready', () => {
  log(`Bot is online as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
      case 'testmode':
        console.testMode = !console.testMode;
        log(`Test mode is now ${console.testMode ? 'on' : 'off'}`);
        break;
      case 'logerrors':
        logErrors = !logErrors;
        log(`Log errors is now ${logErrors ? 'on' : 'off'}`);
        break;
      case 'console':
        try {
          const code = args.join(' ');
          const script = new vm.Script(code, { timeout: 1000 });
          const sandbox = { 
            Discord,
            client,
            message,
            console: {
              log: (output) => {
                log(output);
              },
              error: (error) => {
                log(error);
              }
            }
          };
          const result = script.runInNewContext(sandbox);
          log(result || 'undefined');
        }
        catch (error) {
          handleError(error, 'Code Error');
        }
        break;
      default:
        log(`Invalid command: ${command}`);
        break;
    }
  }
});
// Login with your bot token

// Create a webhook client with your webhook ID and token
const webhook = new Discord.WebhookClient('1131698001530855584', 'Go2AitrzrPAEFhTaArpbdX_ESPfgwQZOMRtAr7hKoqdO2Qws0BWfNZb-4xhs2n4Ht_oC');
*/


///
client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'whois') {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);
    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`User Info: ${user.tag}`)
      .addField('ID', user.id, true)
      .addField('Status', user.presence.status, true)
      .addField('Created', user.createdAt.toDateString(), true)
      .addField('Joined', member.joinedAt.toDateString(), true)
      .addField(
        'Key Permissions',
        getKeyPermissions(member) || 'None',
        true
      )
      .addField(
        'Acknowledgements',
        getAcknowledgements(member) || 'None',
        true
      )
      .addField(
        'Roles',
        member.roles.cache.map((role) => role.name).join(', ')
      );
    message.channel.send(embed);
  }
});

function getKeyPermissions(member) {
  const keyPermissions = [
    'ADMINISTRATOR',
    'MANAGE_GUILD',
    'MANAGE_CHANNELS',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_NICKNAMES',
    'MANAGE_EMOJIS',
    'MENTION_EVERYONE',
  ];
  const filteredPermissions = member.permissions.toArray().filter((perm) =>
    keyPermissions.includes(perm)
  );
  return filteredPermissions
    .join(', ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getAcknowledgements(member) {
  const acknowledgements = [];
  if (member.guild.ownerID === member.id) {
    acknowledgements.push('Server Owner');
  }
  if (member.roles.cache.some((role) => role.permissions.has('ADMINISTRATOR'))) {
    acknowledgements.push('Server Admin');
  }
  return acknowledgements.join(', ');
}
////

const MODERATION_COMMANDS = ['ban', 'kick', 'mute', 'unmute', 'warn'];
const MODERATION_PERMISSIONS = ['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_ROLES'];
const mutedUsers = new Discord.Collection();

client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (MODERATION_COMMANDS.includes(command)) {
    if (!message.member.hasPermission(MODERATION_PERMISSIONS)) {
      return message.reply('You do not have permission to use this command.');
    }
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to use this command.');
    }
    const member = message.guild.member(user);
    if (!member) {
      return message.reply('The user is not a member of this guild.');
    }
    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply('You cannot use this command on this user.');
    }
    switch (command) {
      case 'ban':
        const banReason = args.slice(1).join(' ') || 'No reason provided';
        await member.ban({ reason: banReason });
        message.channel.send(`${user.tag} has been banned by ${message.author.tag} for ${banReason}.`);
        break;
      case 'kick':
        const kickReason = args.slice(1).join(' ') || 'No reason provided';
        await member.kick(kickReason);
        message.channel.send(`${user.tag} has been kicked by ${message.author.tag} for ${kickReason}.`);
        break;
      case 'mute':
        let muteRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
        if (!muteRole) {
          try {
            muteRole = await message.guild.roles.create({
              data: {
                name: 'Muted',
                color: '#808080',
                permissions: [],
              },
              reason: 'Mute role created by bot',
            });
            message.guild.channels.cache.forEach(async (channel) => {
              await channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
          } catch (error) {
            console.error(error);
            return message.reply('There was an error creating the Muted role.');
          }
        }
        await member.roles.add(muteRole);
        mutedUsers.set(user.id, Date.now());
        message.channel.send(`${user.tag} has been muted by ${message.author.tag}.`);
        break;
      case 'unmute':
        const unmuteRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
        if (!unmuteRole) {
          return message.reply('There is no Muted role in this guild.');
        }
        await member.roles.remove(unmuteRole);
        mutedUsers.delete(user.id);
        message.channel.send(`${user.tag} has been unmuted by ${message.author.tag}.`);
        break;
      case 'warn':
        const warnReason = args.slice(1).join(' ') || 'No reason provided';
        await user.send(`You have been warned by ${message.author.tag} in ${message.guild.name} for ${warnReason}.`);
        message.channel.send(`${user.tag} has been warned by ${message.author.tag} for ${warnReason}.`);
        break;
      default:
        message.reply('Invalid command.');
    }
  }
});
client.on('guildMemberAdd', async (member) => {
  if (mutedUsers.has(member.id)) {
    const muteRole = member.guild.roles.cache.find((role) => role.name === 'Muted');
    if (muteRole) {
      await member.roles.add(muteRole);
    }
  }
});
///////////
/*const appChannelID = '1128569122503012452';
const appRoleID = '1126156357368815626';
const appQuestions = [
  'Why do you want to be a moderator?',
  'How active are you on the server?',
  'How would you handle a conflict between two members?',
  'What are some of the rules of the server?',
  'Do you have any previous moderation experience?'
];

const appCollection = new Discord.Collection();

function generateID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 8;
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function getAppDataByUserID(userID) {
  // Read appData from a file
  const data = fs.readFileSync('appData.json', 'utf8');
  const appCollection = JSON.parse(data);
  for (const [appID, appData] of Object.entries(appCollection)) {
    if (appData.userID === userID) {
      return appData;
    }
  }
  return null;
}

client.on('message', async (message) => {
  if (message.author.bot) return;
  const userID = message.author.id;
  const appData = getAppDataByUserID(userID);
  if (message.channel.id === appChannelID) {
    if (!appData) {
      const appID = generateID();
      const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Moderator Application')
        .setDescription(
          `Welcome to the moderator application process. You will be asked a series of questions to determine your eligibility. Please answer them honestly and concisely. To cancel the application, type \`cancel\` at any time.\n\nYour application ID is: **${appID}**. Please keep it for your reference.`
        )
        .setFooter('Question 1 out of ' + appQuestions.length);
      await message.channel.send(welcomeEmbed);
      await message.channel.send(appQuestions[0]);
      // Read appData from a file
      const data = fs.readFileSync('appData.json', 'utf8');
      const appCollection = JSON.parse(data);
      // Add new appData to the collection
      appCollection[appID] = {
        appID: appID,
        userID: userID,
        currentQuestion: 0,
        answers: []
      };
      // Write appData to a file
      fs.writeFile('appData.json', JSON.stringify(appCollection), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('AppData saved successfully');
        }
      });
    } else {
      const answer = message.content;
      if (answer.toLowerCase() === 'cancel') {
        const cancelEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Moderator Application')
          .setDescription('Your application has been cancelled.');
        await message.channel.send(cancelEmbed);
        // Read appData from a file
        const data = fs.readFileSync('appData.json', 'utf8');
        const appCollection = JSON.parse(data);
        // Delete appData from the collection
        delete appCollection[appData.appID];
        // Write appData to a file
        fs.writeFile('appData.json', JSON.stringify(appCollection), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('AppData deleted successfully');
          }
        });
      } else {
        const currentQuestion = appData.currentQuestion;
        const answers = appData.answers;
        answers.push(answer);
        if (currentQuestion < appQuestions.length - 1) {
          const progressEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Moderator Application')
            .setFooter(
              `Question ${currentQuestion + 2} out of ${appQuestions.length}`
            );
          await message.channel.send(progressEmbed);
          await message.channel.send(appQuestions[currentQuestion + 1]);
          // Read appData from a file
          const data = fs.readFileSync('appData.json', 'utf8');
          const appCollection = JSON.parse(data);
          // Update appData in the collection
          appCollection[appData.appID] = {
            appID: appData.appID,
            userID: userID,
            currentQuestion: currentQuestion + 1,
            answers: answers
          };
          // Write appData to a file
          fs.writeFile('appData.json', JSON.stringify(appCollection), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('AppData updated successfully');
            }
          });
        } else {
          const thankEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Moderator Application')
            .setDescription(
              'Thank you for completing the application. Your answers have been submitted for review. You will be notified of the outcome soon.'
            );
          await message.channel.send(thankEmbed);
          // Read appData from a file
          const data = fs.readFileSync('appData.json', 'utf8');
          const appCollection = JSON.parse(data);
          // Delete appData from the collection
          delete appCollection[appData.appID];
          // Write appData to a file
          fs.writeFile('appData.json', JSON.stringify(appCollection), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('AppData deleted successfully');
            }
          });
          const dmEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Moderator Application')
            .setDescription(
              'Here are your answers for your reference. Please do not reply to this message.'
            );
          for (let i = 0; i < appQuestions.length; i++) {
            dmEmbed.addField(appQuestions[i], answers[i]);
          }
          await message.author.send(dmEmbed);
          const staffChannel = message.guild.channels.cache.find(
            (c) => c.name === 'staff'
          );
          const staffEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Moderator Application')
            .setDescription(
              `${message.author} has completed the application. Here are their answers:`
            );
          for (let i = 0; i < appQuestions.length; i++) {
            staffEmbed.addField(appQuestions[i], answers[i]);
          }
          await staffChannel.send(staffEmbed);
        }
      }
    }
  } else {
    const prefix = '-';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'acc') {
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      if (!args[0]) return;
      const appID = args[0];
      // Read appData from a file
      const data = fs.readFileSync('appData.json', 'utf8');
      const appCollection = JSON.parse(data);
      // Use bracket notation to get appData
      const appData = appCollection[appID];
      if (!appData) return;
      const applicant = await message.guild.members.fetch(appData.userID);
      const appRole = message.guild.roles.cache.get(appRoleID);
      if (!applicant.roles.cache.has(appRoleID)) return;
      await applicant.roles.remove(appRole);

      // Use role ID instead of role name
      const modRole = message.guild.roles.cache.find(
        (r) => r.id === '1126156357368815626'
      );
      await applicant.roles.add(modRole);
      const dmEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Moderator Application')
        .setDescription(
          'Congratulations! Your application has been accepted. You are now a moderator on this server.'
        );
      await applicant.send(dmEmbed).catch((error) => {
        const generalChannel = message.guild.channels.cache.find(
          (c) => c.name === 'general'
        );
        generalChannel.send(
          `${applicant}, congratulations! Your application has been accepted. You are now a moderator on this server.`
        );
      });
      const staffChannel = message.guild.channels.cache.find(
        (c) => c.name === 'staff'
      );
      const staffEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Moderator Application')
        .setDescription(
          `${applicant}'s application has been accepted by ${message.author}.`
        );
      await staffChannel.send(staffEmbed);
    }

    if (command === 'deny') {
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      if (!args[0]) return;
      const appID = args[0];
      // Read appData from a file
      const data = fs.readFileSync('appData.json', 'utf8');
      const appCollection = JSON.parse(data);
      // Use bracket notation to get appData
      const appData = appCollection[appID];
      if (!appData) return;
      const applicant = await message.guild.members.fetch(appData.userID);
      const appRole = message.guild.roles.cache.get(appRoleID);
      if (!applicant.roles.cache.has(appRoleID)) return;
      await applicant.roles.remove(appRole);
      const dmEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Moderator Application')
        .setDescription(
          'We are sorry to inform you that your application has been denied. Thank you for your interest and effort.'
        );
await applicant.send(dmEmbed).catch((error) => {
        const generalChannel = message.guild.channels.cache.find(
          (c) => c.name === 'general'
        );
        generalChannel.send(
          `${applicant}, we are sorry to inform you that your application has been denied. Thank you for your interest and effort.`
        );
      });
      const staffChannel = message.guild.channels.cache.find(
        (c) => c.name === 'staff'
      );
      const staffEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Moderator Application')
        .setDescription(
          `${applicant}'s application has been denied by ${message.author}.`
        );
      await staffChannel.send(staffEmbed);
    }
  }
});*/
///////
 /*const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord-buttons');

const appChannelID = '1128569122503012452';
const appRoleID = '1126156357368815626';
const appQuestions = [
  'Why do you want to be a moderator?',
  'How active are you on the server?',
  'How would you handle a conflict between two members?',
  'What are some of the rules of the server?',
  'Do you have any previous moderation experience?'
];

const appCollection = new Discord.Collection();

function generateID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 8;
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function getAppDataByUserID(userID) {
  for (const [appID, appData] of appCollection) {
    if (appData.userID === userID) {
      return appData;
    }
  }
  return null;
}

client.on('message', async (message) => {
  if (message.author.bot) return;
  const userID = message.author.id;
  const appData = getAppDataByUserID(userID);
  if (message.channel.id === appChannelID) {
    if (!appData) {
      const appID = generateID();
      const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Moderator Application')
        .setDescription(
          `Welcome to the moderator application process. You will be asked a series of questions to determine your eligibility. Please answer them honestly and concisely. To cancel the application, type \`cancel\` at any time.\n\nYour application ID is: **${appID}**. Please keep it for your reference.`
        )
        .setFooter('Question 1 out of ' + appQuestions.length);
      await message.channel.send(welcomeEmbed);
      await message.channel.send(appQuestions[0]);
      appCollection.set(appID, {
        appID: appID,
        userID: userID,
        currentQuestion: 0,
        answers: []
      });
    } else {
      const answer = message.content;
      if (answer.toLowerCase() === 'cancel') {
        const cancelEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Moderator Application')
          .setDescription('Your application has been cancelled.');
        await message.channel.send(cancelEmbed);
        appCollection.delete(appData.appID);
      } else {
        const currentQuestion = appData.currentQuestion;
        const answers = appData.answers;
        answers.push(answer);
        if (currentQuestion < appQuestions.length - 1) {
          const progressEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Moderator Application')
            .setFooter(
              `Question ${currentQuestion + 2} out of ${appQuestions.length}`
            );
          await message.channel.send(progressEmbed);
          await message.channel.send(appQuestions[currentQuestion + 1]);
          appCollection.set(appData.appID, {
            appID: appData.appID,
            userID: userID,
            currentQuestion: currentQuestion + 1,
            answers: answers
          });
        } else {
          const thankEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Moderator Application')
            .setDescription(
              'Thank you for completing the application. Your answers have been submitted for review. You will be notified of the outcome soon.'
            );
          await message.channel.send(thankEmbed);
          appCollection.delete(appData.appID);
          const dmEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Moderator Application')
            .setDescription(
              'Here are your answers for your reference. Please do not reply to this message.'
            );
          for (let i = 0; i < appQuestions.length; i++) {
            dmEmbed.addField(appQuestions[i], answers[i]);
          }
         const applicant await applicant.send(dmEmbed).catch((error) => {
            const generalChannel = message.guild.channels.cache.find(
              (c) => c.name === 'general'
            );
            generalChannel.send(
              `${applicant}, here are your answers for your reference. Please do not reply to this message.`
            );
          });
          const staffChannel = message.guild.channels.cache.find(
            (c) => c.name === 'staff'
          );
          const staffEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Moderator Application')
            .addField('Application ID', appData.appID)
            .addField('Applicant', `<@${userID}>`);
          for (let i = 0; i < appQuestions.length; i++) {
            staffEmbed.addField(appQuestions[i], answers[i]);
          }
          const acceptButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('Accept')
            .setCustomId('accept');

          const denyButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel('Deny')
            .setCustomId('deny');

          const row = new ActionRowBuilder()
            .addComponents(acceptButton, denyButton);

          await staffChannel.send({ embed: staffEmbed, components: [row] });
        }
      }
    }
  }
});

client.on('clickButton', async (button) => {
  const appID = button.message.embeds[0].fields[0].value; // assuming the appID is the first field of the embed
  const appData = appCollection.get(appID);
  if (!appData) return;
  const applicant = await button.guild.members.fetch(appData.userID);
  const appRole = button.guild.roles.cache.get(appRoleID);
  if (!applicant.roles.cache.has(appRoleID)) return;
  await applicant.roles.remove(appRole);

  if (button.id === 'accept') {
    // accept the application
    const modRole = button.guild.roles.cache.find(
      (r) => r.name === 'Moderator'
    );
    await applicant.roles.add(modRole);
    const dmEmbed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Moderator Application')
      .setDescription(
        'Congratulations! Your application has been accepted. You are now a moderator on this server.'
      );
    await applicant.send(dmEmbed).catch((error) => {
      const generalChannel = button.guild.channels.cache.find(
        (c) => c.name === 'general'
      );
      generalChannel.send(
        `${applicant}, congratulations! Your application has been accepted. You are now a moderator on this server.`
      );
    });
    await button.reply.send('Application accepted.', true);
  } else if (button.id === 'deny') {
    // deny the application
    const dmEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Moderator Application')
      .setDescription(
        'We are sorry to inform you that your application has been denied. Thank you for your interest and effort.'
      );
    await applicant.send(dmEmbed).catch((error) => {
      const generalChannel = button.guild.channels.cache.find(
        (c) => c.name === 'general'
      );
      generalChannel.send(
        `${applicant}, we are sorry to inform you that your application has been denied. Thank you for your interest and effort.`
      );
    });
    await button.reply.send('Application denied.', true);
  }
});*/
//////////
 client.on('message', message => {
  if (message.content.startsWith('!cd')) {
    const targetServer = client.guilds.cache.get('348950764997312515');
    const targetChannel = targetServer.channels.cache.get('1070062505877049374');

    if (targetChannel) {
      const messageContent = message.content.slice(4); // Remove the "!cd" prefix
      const senderName = message.author.username;
      targetChannel.send(`${messageContent} (Sent by ${senderName})`);
    }
  }
});
/////////
const targetServerId = "884513124500258886";

client.on('message', async (message) => {
  // Ignore messages from bots and messages not from the target servers
  if (message.author.bot || message.guild.id !== targetServerId) return;
   const author = message.author;
  const senderName = author.username;
  const senderAvatar = author.displayAvatarURL();
  const date = message.createdAt.toUTCString();
  const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
  const channelMention = message.channel.toString();

  // Create the embed
  const embed = new Discord.MessageEmbed()
    .setAuthor(senderName, senderAvatar)
    .addField('Channel', channelMention)
    .setDescription(`\`\`\`${message.content}\`\`\``)
    .setColor('#00ff00')
    .setFooter(date)
    .addField('Message Link', `[Jump to Message](${messageLink})`);
  // Log the embed to console or any desired channel
 // console.log(embed);

 const logChannel = client.channels.cache.get('1131692189240545451');
  logChannel.send(embed);
});
////
client.on('message', async (message) => {
  // Check if the message is from a code server channel
  if (message.channel.type === 'text' && message.guild.id === '790218273500168242') {
    // Check if the message starts with your prefix
    if (message.content.startsWith('!')) {
      // Extract the command name from the message content
      const command = message.content.slice(1).trim();
      // Compare the command name with your desired command name
      if (command === 'stats') {
        // Get a collection of all the channels in the server
        const allChannels = message.guild.channels.cache;

        // Get the total number of members in the guild
        const totalMembers = message.guild.memberCount;

        // Get the messages sent in all the channels in the last 24 hours
        const messages24h = await Promise.all(allChannels.map((channel) => channel.messages.fetch({limit: 100, after: Date.now() - 86400000})));
        // Flatten the array of collections into one collection
        messages24h = messages24h.reduce((acc, val) => acc.concat(val));
        // Get the number of messages sent by each member in all the channels in the last 24 hours
        const memberMessages24h = messages24h.reduce((acc, msg) => {
          acc[msg.author.id] = (acc[msg.author.id] || 0) + 1;
          return acc;
        }, {});

        // Get the messages sent in all the channels in the last 7 days
        const messages7d = await Promise.all(allChannels.map((channel) => channel.messages.fetch({limit: 100, after: Date.now() - 604800000})));
        // Flatten the array of collections into one collection
        messages7d = messages7d.reduce((acc, val) => acc.concat(val));
        // Get the number of messages sent by each member in all the channels in the last 7 days
        const memberMessages7d = messages7d.reduce((acc, msg) => {
          acc[msg.author.id] = (acc[msg.author.id] || 0) + 1;
          return acc;
        }, {});

        // Get the number of members who have been active in all the channels in the last 24 hours
        const activeMembers24h = message.guild.members.cache.filter((member) => messages24h.has(member.lastMessageID));
        // Get the number of members who have been active in all the channels in the last 7 days
        const activeMembers7d = message.guild.members.cache.filter((member) => messages7d.has(member.lastMessageID));

        // Create an embed object that contains the activity stats
        const embed = new Discord.MessageEmbed()
          .setColor(0x0099FF)
          .setTitle('Server Activity Stats')
          .setDescription('Here are some statistics about the activity of the whole server.')
          .addField('Total members', `${totalMembers}`)
          .addField('Messages in last 24 hours', `${messages24h.size}`)
          .addField('Messages in last 7 days', `${messages7d.size}`)
          .addField('Member messages in last 24 hours', `${JSON.stringify(memberMessages24h)}`)
          .addField('Member messages in last 7 days', `${JSON.stringify(memberMessages7d)}`)
          .addField('Active members in last 24 hours', `${activeMembers24h.size}`)
          .addField('Active members in last 7 days', `${activeMembers7d.size}`)
          .setTimestamp()
          .setFooter('Generated by Bing');

        // Get the code channel where you want to send the embed
        const codeChannel = message.guild.channels.cache.find(channel => channel.name === 'js-codes');
        // Send the embed object to the code channel
        codeChannel.send(embed);
      }
    }
  }
});
////
const axios = require('axios');

// Define the i8 API endpoint
const i8API = 'https://i8.to/api/shorten';

// Define a function that takes a long URL and returns a shortened one using i8
async function shortenURL(longURL) {
  try {
    // Make a POST request to the i8 API with the long URL as the data
    const response = await axios.post(i8API, longURL);

    // Return the shortened URL from the response
    return response.data.short_url;
  } catch (error) {
    // Handle any errors and return null
    console.error(error);
    return null;
  }
}

// Define a command prefix
 

// Listen for messages
client.on('message', async (message) => {
  // Ignore messages from bots or without the prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Get the command and arguments from the message
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // If the command is 'shorten', try to shorten the URL given as the first argument
  if (command === 'short') {
    // Check if there is a URL argument
    if (!args[0]) {
      // If not, reply with an error message
      message.reply('Please provide a URL to shorten.');
      return;
    }

    // Get the URL argument
    const url = args[0];

    // Try to shorten the URL using i8
    const shortURL = await shortenURL(url);

    // Check if the shortening was successful
    if (shortURL) {
      // If yes, reply with the shortened URL
      message.reply(`Here is your shortened URL: ${shortURL}`);
    } else {
      // If not, reply with an error message
      message.reply('Sorry, something went wrong. Please try again later.');
    }
  }
});
/////////
/*const logChannelID1 = '1128569122503012452';

console.testMode = false;

let logErrors = false;

function log(message) {
  if (console.testMode) {
    console.log(message);
  }
  else if (logErrors) {
    const logChannel = client.channels.cache.get(logChannelID);
    if (logChannel) {
      logChannel.send(message);
    }
    else {
      console.error('Log channel not found');
    }
  }
}

function handleError(error, source) {
  const prefix = `[${source}]`;
  // create an embed object for the error message
  const errorEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Got An Error')
    .setDescription(error.message)
    .setTimestamp()
    .setFooter('Code Error');
  // send the embed object to the webhook or the channel
  log(`${prefix} ${error.message}\n${error.stack}`);
  if (webhook) {
    // try to send the embed object to the webhook
    webhook.send({
      // content: `${prefix} ${util.format(error)}`,
      embeds: [errorEmbed]
    }).catch((err) => {
      // if the embed fails, create a file name using the current date and time
      const fileName = `error-${Date.now()}.txt`;
      // write the error stack to the file
      fs.writeFile(fileName, error.stack, (err) => {
        if (err) {
          console.log(`Failed to write error to file: ${err.message}`);
        }
        else {
          // create an attachment object using the file name and path
          const attachment = new Discord.MessageAttachment(fileName, fileName);
          // send the attachment along with a simple message to the webhook
          webhook.send({
            content: `${prefix} Error too big to send as embed. Check attachment.`,
            files: [attachment]
          }).catch((err) => {
            console.log(`Failed to send error to webhook: ${err.message}`);
          });
        }
      });
    });
  }
}

process.on('uncaughtException', (error) => {
  handleError(error, 'Uncaught Exception');
});
process.on('unhandledRejection', (error) => {
  handleError(error, 'Unhandled Rejection');
});
client.on('ready', () => {
  log(`Bot is online as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
      case 'testmode':
        console.testMode = !console.testMode;
        log(`Test mode is now ${console.testMode ? 'on' : 'off'}`);
        break;
      case 'logerrors':
        logErrors = !logErrors;
        log(`Log errors is now ${logErrors ? 'on' : 'off'}`);
        break;
      case 'console':
        try {
          const code = args.join(' ');
          const script = new vm.Script(code, { timeout: 1000 });
          const sandbox = { 
            Discord,
            client,
            message,
            console: {
              log: (output) => {
                log(output);
              },
              error: (error) => {
                log(error);
              }
            }
          };
          const result = script.runInNewContext(sandbox);
          log(result || 'undefined');
        }
        catch (error) {
          handleError(error, 'Code Error');
        }
        break;
      default:
        log(`Invalid command: ${command}`);
        break;
    }
  }
});

const webhook = new Discord.WebhookClient('1131698001530855584', 'Go2AitrzrPAEFhTaArpbdX_ESPfgwQZOMRtAr7hKoqdO2Qws0BWfNZb-4xhs2n4Ht_oC');*/
///
 
 
/////////
 const nsfwbot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INVITES"] });

// A cache to store the invites of each guild
const guildInvites = new Map();

// An invite create event to update the map
client.on("inviteCreate",async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

// A ready event to fetch the invites
client.on("ready",() =>{
    console.log(`${client.user.tag} is Online`)
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
    });
});

// A guild member add event to handle new members
client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);

    try{
        // Get the invite that the member used to join
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        // Add a new property to the member object with the invite info
        member.invite = usedInvite;
    }
    catch(err) {console.log(err);}
})

// A message event to handle commands
client.on('message', message => {
  // Check if the message is a command
  if (message.content.startsWith('-check')) {
    // Get the user mention or id from the command arguments
    let user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
    // If no user is found, default to the message author
    if (!user) user = message.author;
    // Get the guild member from the user
    let member = message.guild.member(user);
    // If no member is found, return a message
    if (!member) return message.channel.send('Member not found.');
    // Create a new embed to display the user info
    let embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${user.tag} info`)
      .setThumbnail(user.displayAvatarURL())
      .addField('Joined Discord', user.createdAt.toDateString(), true)
      .addField('Joined Server', member.joinedAt.toDateString(), true);
    // Check if the member has an invite property
    if (member.invite) {
      // Add the invite inviter's name and link to the embed
      embed.addField('Invited By', member.invite.inviter.tag, true);
      embed.addField('Invite Link', `https://discord.gg/${member.invite.code}`, true);
    } else {
      // Add unknown to the embed
      embed.addField('Invited By', 'Unknown', true);
      embed.addField('Invite Link', 'Unknown', true);
    }
    // Send the embed to the channel
    message.channel.send(embed);
  }
});
////////////
const canvas = require("discord-canvas");
const welcomeCanvas = new canvas.Welcome();

client.on("guildMemberAdd", async member => {
  let welcome = await welcomeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))
    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .setColor("avatar", "#8015EA")
    .setBackground(
      "https://media.discordapp.net/attachments/743111735178952834/794106546660573184/pexels-photo-114979.png"
    ) 
    .toAttachment();
  let astra = new Discord.MessageAttachment(
    welcome.toBuffer(),
    "welcome.png"
  );
  member.guild.channels.cache.get("799946166208823308").send(astra).then(msg => {
    msg.channel.send(`Welcome! ${member}`)})})
///////
/*client.on('message', (message) => {
  if (message.content.startsWith('-removerole')) {
    const rolePing = message.mentions.roles.first();

    if (!rolePing) {
      message.channel.send('Please mention a role to remove members from.');
      return;
    }

    const roleMembers = rolePing.members;

    roleMembers.forEach((member) => {
      member.roles.remove(rolePing).catch(console.error);
    });

    message.channel.send(`Removed all members from the ${rolePing.name} role. Total removed members: ${roleMembers.size}`);
  } else if (message.mentions.roles.size > 0) {
    const rolePing = message.mentions.roles.first();

    const membersWithRole = rolePing.members.map((m) => m.user.tag).join('\n');

    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`Members with the ${rolePing.name} role`)
      .setDescription(membersWithRole);

    message.channel.send(embed);
  }
});*/
////
/*const removedMembers = new Discord.Collection();

client.on('message', (message) => {
  if (message.content.startsWith('-removerole')) {
    const rolePing = message.mentions.roles.first();

    if (!rolePing) {
      message.channel.send('Please mention a role to remove members from.');
      return;
    }

    const roleMembers = rolePing.members;

    // Add the members who had the role to the collection
    removedMembers.set(rolePing.id, roleMembers);

    roleMembers.forEach((member) => {
      member.roles.remove(rolePing).catch(console.error);
    });

    message.channel.send(`Removed all members from the ${rolePing.name} role. Total removed members: ${roleMembers.size}`);
  } else if (message.content.startsWith('-addrole')) {
    // Get the role and the members who had it from the collection
    const rolePing = message.mentions.roles.first();
    const roleMembers = removedMembers.get(rolePing.id);

    if (!rolePing || !roleMembers) {
      message.channel.send('Please mention a valid role to add members to.');
      return;
    }

    // Add back the role to the members
    roleMembers.forEach((member) => {
      member.roles.add(rolePing).catch(console.error);
    });

    message.channel.send(`Added back all members to the ${rolePing.name} role. Total added members: ${roleMembers.size}`);
  } else if (message.mentions.roles.size > 0) {
    const rolePing = message.mentions.roles.first();

    const membersWithRole = rolePing.members.map((m) => m.user.tag).join('\n');

    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`Members with the ${rolePing.name} role`)
      .setDescription(membersWithRole);

    message.channel.send(embed);
  }
});
*/
////////////
 
const logChannelID = '1128569122503012452';
const webhook = new Discord.WebhookClient('1219095246139560016', '1PXsR1lxYo9PyPvtpHePAZnPEamMjEaqBK41UxySD4jzYDHQtB0Wn8pD1PA_LJgK1Kkl');

let logErrors = false;
console.testMode = true;

client.once('ready', () => {
  log(`Bot is online as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'testmode':
        toggleTestMode();
        break;
      case 'logerrors':
        toggleLogErrors();
        break;
      case 'console':
        executeConsoleCommand(args.join(' '));
        break;
      default:
        log(`Invalid command: ${command}`);
        break;
    }
  }
});

process.on('uncaughtException', (error) => handleError(error, 'Uncaught Exception'));
process.on('unhandledRejection', (error) => handleError(error, 'Unhandled Rejection'));

// Toggle test mode on and off
function toggleTestMode() {
  console.testMode = !console.testMode;
  log(`Test mode is now ${console.testMode ? 'on' : 'off'}`);
}

// Toggle error logging on and off
function toggleLogErrors() {
  logErrors = !logErrors;
  log(`Log errors is now ${logErrors ? 'on' : 'off'}`);
}

// Log messages based on mode and configuration
function log(message) {
  if (console.testMode) {
    console.log(message);
  } else if (logErrors) {
    const logChannel = client.channels.cache.get(logChannelID);
    if (logChannel) {
      logChannel.send(message);
    } else {
      console.error('Log channel not found');
    }
  }
}

// Handle and log errors
function handleError(error, source) {
  const prefix = `[${source}]`;
  const errorEmbed = createErrorEmbed(error, prefix);

  log(`${prefix} ${error.message}\n${error.stack}`);
  
  if (webhook) {
    sendErrorToWebhook(errorEmbed, error, prefix);
  }
}

// Create an error embed object
function createErrorEmbed(error, prefix) {
  return new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Got An Error')
    .setDescription(error.message)
    .setTimestamp()
    .setFooter('Code Error');
}

// Send error details to the webhook
function sendErrorToWebhook(errorEmbed, error, prefix) {
  if (embedLength(errorEmbed) > 6000) {
    const fileName = `error-${Date.now()}.txt`;
    fs.writeFile(fileName, error.stack, (err) => {
      if (err) {
        console.log(`Failed to write error to file: ${err.message}`);
      } else {
        const attachment = new Discord.MessageAttachment(fileName, fileName);
        webhook.send({
          content: `${prefix} Error too big to send as embed. Check attachment.`,
          files: [attachment]
        }).then(() => {
          fs.unlink(fileName, (err) => {
            if (err) {
              console.log(`Failed to delete file: ${err.message}`);
            }
          });
        }).catch((err) => {
          console.log(`Failed to send error to webhook: ${err.message}`);
        });
      }
    });
  } else {
    webhook.send({
      embeds: [errorEmbed]
    }).catch((err) => {
      console.log(`Failed to send error to webhook: ${err.message}`);
    });
  }
}

// Calculate the length of an embed
function embedLength(embed) {
  let length = 0;
  if (embed.title) length += embed.title.length;
  if (embed.description) length += embed.description.length;
  if (embed.footer && embed.footer.text) length += embed.footer.text.length;
  if (embed.author && embed.author.name) length += embed.author.name.length;
  if (embed.fields && embed.fields.length > 0) {
    for (const field of embed.fields) {
      length += field.name.length + field.value.length;
    }
  }
  return length;
}

// Execute a command from the console
function executeConsoleCommand(code) {
  try {
    const script = new vm.Script(code, { timeout: 1000 });
    const sandbox = {
      Discord,
      client,
      console: {
        log: (output) => log(output),
        error: (error) => log(error),
      },
    };
    const result = script.runInNewContext(sandbox);
    log(result || 'undefined');
  } catch (error) {
    handleError(error, 'Code Error');
  }
}
//////////////
 const config1 = JSON.parse(fs.readFileSync('./config1.json', 'utf8'));
  
// When the bot receives a message, execute this function
client.on('message', async (message) => {
  // Ignore messages from bots or in DMs
  if (message.author.bot || message.channel.type === 'dm') return;

  // Get the channel ID and the message content from the message object
  const channelID = message.channel.id;
  const content = message.content;

  // Check if the channel ID matches the counting channel ID from the config file
  if (channelID === config1.countingChannel) {
    // Read the data.json file and parse it
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    // Get the current count and the last user ID from the data object
    let count = data.count;
    let lastUserID = data.lastUserID;

    // Check if the message content is a number
    if (isNaN(content)) {
      // If not, delete the message and return
      await message.delete();
      return;
    }

    // Convert the message content to a number
    const number = Number(content);

    // Check if the number is equal to the current count plus one
    if (number === count + 1) {
      // If yes, increment the count and update the last user ID
      count++;
      lastUserID = message.author.id;

      // Save the new data to the data.json file
      fs.writeFileSync('./data.json', JSON.stringify({ count, lastUserID }));

      // React to the message with a green check mark emoji
      await message.react('✅');
    } else {
      // If not, delete the message and return
      await message.delete();
      return;
    }
  }
}); 
//////
const EMOJI_SIZE = 128
const STICKER_SIZE = 320 // Changed to 320x320 as per Discord's requirement
const EMOJI_COMMAND = '$emoji';
const STICKER_COMMAND = '$sticker';

client.on('message', async message => {
  if (message.content.startsWith(EMOJI_COMMAND)) {
    let image = await getImageFromMessage(message);
    if (image) {
      image.resize(EMOJI_SIZE, EMOJI_SIZE);
      let tempFile = './temp.png';
      image.write(tempFile, async err => {
        if (err) {
          console.error(err);
          message.reply({ content: 'Sorry, something went wrong.' });
        } else {
          let emoji = await message.guild.emojis.create(tempFile, message.content.replace(EMOJI_COMMAND, '').trim());
          if (emoji) {
            message.reply({ content: `Here is your emoji: ${emoji}` });
          }
          fs.unlinkSync(tempFile);
        }
      });
    } else {
      message.reply({ content: 'Sorry, I could not find an image in your message.' });
    }
  }

  if (message.content.startsWith(STICKER_COMMAND)) {
    let image = await getImageFromMessage(message);
    if (image) {
      image.resize(STICKER_SIZE, STICKER_SIZE); // Changed to 320x320 as per Discord's requirement
      let tempFile = './temp.png';
      image.write(tempFile, async err => {
        if (err) {
          console.error(err);
          message.reply({ content: 'Sorry, something went wrong.' });
        } else {
          let [name, description] = message.content.replace(STICKER_COMMAND, '').split(',').map(s => s.trim());
          if (name && description) {
            let sticker = await message.guild.stickers.create(tempFile, name, description);
            if (sticker) {
              message.reply({ content: 'Here is your sticker:', stickers: [sticker] });
            }
          }
          fs.unlinkSync(tempFile);
        }
      });
    } else {
      message.reply({ content: 'Sorry, I could not find an image in your message.' });
    }
  }
});

async function getImageFromMessage(message) {
  const IMAGE_URL_REGEX = /(https?:\/\/[^\s]+\.png|jpg|jpeg|bmp|gif|tiff|webp)(?:$|[^\s]+)/i;
  let imageUrl;
  if (message.attachments && (attachment = message.attachments.find(val => val.height && val.url && val.url.match(IMAGE_URL_REGEX)))) {
    imageUrl = attachment.url;
  }
  let match;
  if (message.content && (match = message.content.match(IMAGE_URL_REGEX))) {
    imageUrl = match[0].replace('>', '');
  } else if (message.embeds && (embed = message.embeds.find(val => (val.image && val.image.url) || (val.thumbnail && val.thumbnail.url)))) {
    imageUrl = embed.image ? embed.image.url : embed.thumbnail.url;
  }
  if (imageUrl) {
    let image = await Jimp.read(imageUrl);
    return image;
  } else {
    return null;
  }
}
///////////
/*const jailedUsersFile = 'jailedUsers.json';
const logsFile = 'logs.json';

if (!fs.existsSync(logsFile)) {
    fs.writeFileSync(logsFile, '[]');
}

client.on('message', async message => {
    if (message.content.startsWith('!jail')) {
        const args = message.content.split(' ');
        if (args.length < 4) return message.reply('Usage: !jail <member> <time in minutes> <reason>');

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.');

        const mentionedUser = message.mentions.members.first();
        if (!mentionedUser) return message.reply('Please mention a user to jail.');

        const jailTimeMinutes = parseInt(args[2]);
        if (isNaN(jailTimeMinutes) || jailTimeMinutes <= 0) return message.reply('Please provide a valid positive number for the jail time.');

        const reason = args.slice(3).join(' ');
        if (!reason) return message.reply('Please provide a reason for jailing the user.');

        const prisonChannelName = 'prison';
        const prisonRoleName = 'Prisoner';

        try {
            let prisonChannel = message.guild.channels.cache.find(channel => channel.name === prisonChannelName);
            if (!prisonChannel) {
                prisonChannel = await message.guild.channels.create(prisonChannelName, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        }
                    ]
                });
            }

            let prisonRole = message.guild.roles.cache.find(role => role.name === prisonRoleName);
            if (!prisonRole) {
                prisonRole = await message.guild.roles.create({
                    data: {
                        name: prisonRoleName,
                        color: 'DARK_RED',
                        permissions: []
                    }
                });
            }

            const releaseTime = new Date().getTime() + jailTimeMinutes * 60 * 1000;

            let jailedUsers = JSON.parse(fs.readFileSync(jailedUsersFile, 'utf8'));
            jailedUsers[mentionedUser.id] = {
                releaseTime: releaseTime,
                reason: reason
            };
            fs.writeFileSync(jailedUsersFile, JSON.stringify(jailedUsers, null, 4));

            logAction(message.author.tag, mentionedUser.user.tag, 'Jail', reason);

            await mentionedUser.voice.kick();
            await mentionedUser.roles.add(prisonRole);
            await prisonChannel.updateOverwrite(prisonRole, { VIEW_CHANNEL: true });

            message.reply(`${mentionedUser} has been jailed for ${jailTimeMinutes} minutes. Reason: ${reason}`);
        } catch (error) {
            console.error('Error occurred:', error);
            message.reply('An error occurred while trying to jail the user.');
        }
    } else if (message.content.startsWith('!unjail')) {
        const args = message.content.split(' ');
        if (args.length !== 2) return message.reply('Usage: !unjail <member>');

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.');

        const mentionedUser = message.mentions.members.first();
        if (!mentionedUser) return message.reply('Please mention a user to unjail.');

        try {
            const guild = message.guild;

            let jailedUsers = JSON.parse(fs.readFileSync(jailedUsersFile, 'utf8'));
            if (jailedUsers.hasOwnProperty(mentionedUser.id)) {
                delete jailedUsers[mentionedUser.id];
                fs.writeFileSync(jailedUsersFile, JSON.stringify(jailedUsers, null, 4));
            } else {
                return message.reply('This user is not currently jailed.');
            }

            logAction(message.author.tag, mentionedUser.user.tag, 'Unjail', '');

            const prisonRole = guild.roles.cache.find(role => role.name === 'Prisoner');
            if (prisonRole) {
                mentionedUser.roles.remove(prisonRole);
            }

            message.reply(`${mentionedUser} has been unjailed.`);
        } catch (error) {
            console.error('Error occurred:', error);
            message.reply('An error occurred while trying to unjail the user.');
        }
    } else if (message.content.startsWith('!jlogs')) {
        const args = message.content.split(' ');
        if (args.length !== 2) return message.reply('Please provide a member\'s ID or tag.');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(member => member.user.tag === args[1]);
        if (!member) return message.reply('Member not found.');

        try {
            const logs = JSON.parse(fs.readFileSync(logsFile, 'utf8'));
            if (!Array.isArray(logs)) throw new Error('Invalid logs data.');

            const memberLogs = logs.filter(log => log.target === member.user.tag);
            if (memberLogs.length === 0) {
                return message.channel.send('No jail logs found for this member.');
            }

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Jail Logs for ${member.user.tag}`)
                .setDescription('Here are the jail logs for the specified member:')
                .addFields(
                    memberLogs.map(log => {
                        return {
                            name: `${log.action} at ${log.timestamp}`,
                            value: log.reason ? `Reason: ${log.reason}` : 'No reason provided',
                        };
                    })
                );

            message.channel.send(embed);
        } catch (error) {
            console.error('Error occurred:', error);
            message.reply('An error occurred while trying to fetch jail logs.');
        }
    }
});

function logAction(author, target, action, reason) {
    let logs = JSON.parse(fs.readFileSync(logsFile, 'utf8'));
    logs.push({
        timestamp: new Date().toISOString(),
        author: author,
        target: target,
        action: action,
        reason: reason
    });
    fs.writeFileSync(logsFile, JSON.stringify(logs, null, 4));
}

function checkJailedUsers() {
    const currentTime = new Date().getTime();
    let jailedUsers = JSON.parse(fs.readFileSync(jailedUsersFile, 'utf8'));
    
    for (const [userId, userData] of Object.entries(jailedUsers)) {
        const releaseTime = userData.releaseTime;
        if (currentTime >= releaseTime) {
            const guild = client.guilds.cache.first();
            const user = guild.members.cache.get(userId);
            if (user) {
                const prisonRole = guild.roles.cache.find(role => role.name === 'Prisoner');
                if (prisonRole) {
                    user.roles.remove(prisonRole);
                }
            }
            delete jailedUsers[userId];
            logAction('System', user.user.tag, 'Automatic Unjail', '');
        }
    }
    fs.writeFileSync(jailedUsersFile, JSON.stringify(jailedUsers, null, 4));
}

setInterval(checkJailedUsers, 60 * 1000);*/
//////////////
/*let playerData = {};

try {
  const data = fs.readFileSync('player_data.json', 'utf8');
  playerData = JSON.parse(data);
} catch (err) {
  console.error("Error reading player data file:", err);
}

function savePlayerData() {
  fs.writeFile('player_data.json', JSON.stringify(playerData, null, 2), (err) => {
    if (err) {
      console.error("Error writing player data to file:", err);
    } else {
      console.log("Player data saved successfully!");
    }
  });
}

function generatePlayerId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';
  for (let i = 0; i < 3; i++) {
    id += Math.floor(Math.random() * 10);
  }
  for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return id;
}

function registerPlayer(userId, username) {
  if (getPlayerIdByUserId(userId)) {
    return false; // User is already registered
  }
  const playerId = generatePlayerId();
  playerData[playerId] = {
    userId: userId,
    username: username,
    elo: 1000,
    rank: "Private",
    gamesPlayed: 0,
    scores: 0,
    wins: 0
  };
  savePlayerData();
  return playerId;
}

function removePlayer(playerId) {
  if (playerData[playerId]) {
    delete playerData[playerId];
    savePlayerData();
    return true;
  } else {
    return false;
  }
}

function getPlayerIdByUserId(userId) {
  for (const playerId in playerData) {
    if (playerData[playerId].userId === userId) {
      return playerId;
    }
  }
  return null;
}

function getPlayerIdByUsername(username) {
  for (const playerId in playerData) {
    if (playerData[playerId].username === username) {
      return playerId;
    }
  }
  return null;
}

function calculateEloChange(playerRating, opponentRating, playerResult) {
  const K = 32; // Elo rating constant
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  return Math.round(K * (playerResult - expectedScore));
}

function getRankByElo(elo) {
  if (elo >= 2800) {
    return "Command in Chief";
  } else if (elo >= 2600) {
    return "General";
  } else if (elo >= 2400) {
    return "Brigadier General";
  } else if (elo >= 2200) {
    return "Colonel";
  } else if (elo >= 2000) {
    return "Major";
  } else if (elo >= 1800) {
    return "Captain";
  } else if (elo >= 1600) {
    return "Lieutenant";
  } else if (elo >= 1400) {
    return "Sergeant";
  } else if (elo >= 1200) {
    return "Corporal";
  } else {
    return "Private";
  }
}

client.on('message', async message => {
  const command = message.content.split(' ')[0].toLowerCase();

  if (command === '/register') {
    const userId = message.author.id;
    const username = message.author.username;
    const playerId = registerPlayer(userId, username);
    if (playerId) {
      const user = await client.users.fetch(userId);
      try {
        await user.send(`You have been successfully registered with player ID: ${playerId}`);
        message.reply('Check your DMs for your player ID!');
      } catch (error) {
        message.reply(`You have been successfully registered with player ID: ${playerId}`);
      }
    } else {
      message.reply('You are already registered!');
    }
  } else if (command === '/remove') {
    const userId = message.author.id;
    const playerId = getPlayerIdByUserId(userId);
    if (playerId) {
      if (removePlayer(playerId)) {
        message.reply(`Player with ID ${playerId} has been successfully removed.`);
      } else {
        message.reply(`Failed to remove player with ID ${playerId}.`);
      }
    } else {
      message.reply('You are not registered.');
    }
  } else if (command === '/checkid') {
    const userId = message.author.id;
    const playerId = getPlayerIdByUserId(userId);
    if (playerId) {
      message.channel.send(`Your player ID: ${playerId}`);
    } else {
      message.reply('You are not registered.');
    }
  } else if (command === '/m') {
    const args = message.content.split(' ');
    if (args.length !== 4) {
      message.reply('Invalid format. Usage: `/m [result] [player ID] [opponent ID]`');
      return;
    }
    const result = args[1].toLowerCase(); // 'loss'
    const playerId = args[2]; // Player's ID
    const opponentId = args[3]; // Opponent's ID

    const playerRating = playerData[playerId] ? playerData[playerId].elo : null;
    const opponentRating = playerData[opponentId] ? playerData[opponentId].elo : null;

    if (!playerRating || !opponentRating) {
      message.channel.send("Invalid player or opponent ID.");
      return;
    }

    let playerResult;
    if (result === 'loss') {
      playerResult = 0;
    } else {
      message.channel.send("Invalid result. Please use 'loss'.");
      return;
    }

    const eloChange = calculateEloChange(playerRating, opponentRating, playerResult);

    playerData[playerId].elo += eloChange;
    playerData[opponentId].elo -= eloChange;

    playerData[playerId].gamesPlayed++;
    playerData[opponentId].gamesPlayed++;

    playerData[playerId].scores -= eloChange;
    playerData[opponentId].scores += eloChange;

    if (playerResult === 0) {
      playerData[playerId].wins++;
    }

    const playerRank = getRankByElo(playerData[playerId].elo);
    const opponentRank = getRankByElo(playerData[opponentId].elo);

    savePlayerData();

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('War Outcome')
      .setDescription(`Player ${playerId} (${playerRank}) has lost to player ${opponentId} (${opponentRank}).`)
      .addFields(
        { name: 'Scores', value: `Player ${playerId}: ${playerData[playerId].scores} (Change: ${eloChange})\nPlayer ${opponentId}: ${playerData[opponentId].scores} (Change: ${-eloChange})` },
      )
      .setTimestamp();
    
    message.channel.send(embed);
  } else if (command === '/stats') {
    const userId = message.author.id;
    const playerId = getPlayerIdByUserId(userId);
    if (!playerId) {
      message.reply('You are not registered.');
      return;
    }

    const playerStats = playerData[playerId];
    const playerRank = getRankByElo(playerStats.elo);

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Player Stats')
      .setDescription(`Stats for Player ${playerId}`)
      .addFields(
        { name: 'Username', value: playerStats.username },
        { name: 'Rank', value: playerRank },
        { name: 'Games Played', value: playerStats.gamesPlayed },
        { name: 'Scores', value: playerStats.scores },
        { name: 'Win Rate', value: `${(playerStats.wins / playerStats.gamesPlayed * 100).toFixed(2)}%` }
      )
      .setTimestamp();
    
    message.channel.send(embed);
  }
});*/
///////////////
 
/////////
client.on('message', async (message) => {
  if (message.content.startsWith('!setprofile')) {
    // Split the message content to get the image URLs for avatar and banner
    const [command, avatarUrl, bannerUrl] = message.content.split(' ');

    try {
      // Set the profile picture
      if (avatarUrl) {
        await client.user.setAvatar(avatarUrl);
      }

      // Set the banner
      if (bannerUrl) {
        await client.user.setBanner(bannerUrl);
      }

      // Send a confirmation message
      message.channel.send('Profile updated successfully!');
    } catch (error) {
      console.error('Error setting profile:', error);
      message.channel.send('An error occurred while updating the profile.');
    }
  }
});
///////
  client.on('message', message => {
    if (message.content === '!deleteRole') { // Command to delete role
        const rolesToDelete = message.guild.roles.cache.filter(role => role.name === 'new role'); // Find roles by name
        if (rolesToDelete.size > 0) {
            rolesToDelete.forEach(role => {
                role.delete()
                    .then(deletedRole => {
                        console.log(`Deleted role ${deletedRole.name}`);
                    })
                    .catch(error => {
                        console.error('Error deleting role:', error);
                    });
            });
            message.channel.send(`Deleted ${rolesToDelete.size} roles with the name 'newrole'.`);
        } else {
            message.channel.send('No roles found with the name "newrole".');
        }
    }
});  
/////////
client.on('message', async (message) => {
    // Check if the message is from the bot itself
    if (message.author.bot) return;

    // Check if the message content is '!delete <message_id>'
    if (message.content.startsWith('!delete')) {
        // Split the message content to get the message ID
        const args = message.content.split(' ');
        const messageId = args[1];

        // Check if the message ID is provided
        if (!messageId) {
            return message.channel.send('Please provide a message ID to delete.');
        }

        try {
            // Fetch the message by its ID
            const fetchedMessage = await message.channel.messages.fetch(messageId);

            // Check if the fetched message exists
            if (fetchedMessage) {
                // Delete the fetched message
                fetchedMessage.delete();
               // message.channel.send(`Message with ID ${messageId} has been deleted.`);
            } else {
                message.channel.send(`Message with ID ${messageId} not found.`);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            message.channel.send('Error deleting message.');
        }
    }
});
////////
 
//////////////
 
 const PREFIX = '-';

const ERROR_ROLE_NAME = process.env.ERROR_ROLE_NAME || 'error';
const JAIL_CHANNEL_NAME = process.env.JAIL_CHANNEL_NAME || 'jail';
const LOG_CHANNEL_NAME = process.env.LOG_CHANNEL_NAME || 'logs';
const DB_FILE = 'errorRoles.json';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(checkRoles, 60000); // Check roles every minute
});

// Helper functions to interact with JSON file
function readDatabase() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({}));
    }
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
}

function writeDatabase(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

client.on('message', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'seterror') {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(embedMessage('Error', 'You do not have permission to use this command.', 'RED'));
        }

        if (args.length < 3) {
            return message.channel.send(embedMessage('Error', 'Usage: -seterror <user> <time> <reason>', 'RED'));
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send(embedMessage('Error', 'Please mention a valid user.', 'RED'));
        }

        const time = parseInt(args[1]);
        if (isNaN(time)) {
            return message.channel.send(embedMessage('Error', 'Please provide a valid time in minutes.', 'RED'));
        }

        const reason = args.slice(2).join(' ');

        let role = message.guild.roles.cache.find(r => r.name === ERROR_ROLE_NAME);
        if (!role) {
            try {
                role = await message.guild.roles.create({
                    data: {
                        name: ERROR_ROLE_NAME,
                        color: 'RED',
                        permissions: []
                    }
                });
            } catch (error) {
                console.error(error);
                return message.channel.send(embedMessage('Error', 'There was an error creating the role.', 'RED'));
            }
        }

        const member = message.guild.member(user);
        if (!member) {
            return message.channel.send(embedMessage('Error', 'User not found.', 'RED'));
        }

        await member.roles.add(role);
        message.guild.channels.cache.forEach(async (channel) => {
            await channel.updateOverwrite(role, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false
            });
        });

        let jailChannel = message.guild.channels.cache.find(c => c.name === JAIL_CHANNEL_NAME);
        if (!jailChannel) {
            try {
                jailChannel = await message.guild.channels.create(JAIL_CHANNEL_NAME, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: role.id,
                            allow: ['VIEW_CHANNEL'],
                            deny: ['SEND_MESSAGES']
                        },
                        {
                            id: message.guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ]
                });
            } catch (error) {
                console.error(error);
                return message.channel.send(embedMessage('Error', 'There was an error creating the jail channel.', 'RED'));
            }
        }

        const db = readDatabase();
        db[user.id] = {
            time: Date.now() + time * 60000,
            reason: reason
        };
        writeDatabase(db);

        logAction(`Assigned "error" role to ${user.tag} for ${time} minutes. Reason: ${reason}`);

        message.channel.send(embedMessage('Success', `${user.tag} has been assigned the "error" role for ${time} minutes. Reason: ${reason}`, 'GREEN'));

        setTimeout(async () => {
            await member.roles.remove(role);
            const db = readDatabase();
            delete db[user.id];
            writeDatabase(db);
            logAction(`Removed "error" role from ${user.tag} after ${time} minutes.`);
            user.send(embedMessage('Notification', 'Your "error" role has been removed after serving your time.', 'GREEN'));
        }, time * 60000);
    }

    if (command === 'removeerror') {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(embedMessage('Error', 'You do not have permission to use this command.', 'RED'));
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send(embedMessage('Error', 'Please mention a valid user.', 'RED'));
        }

        const member = message.guild.member(user);
        if (!member) {
            return message.channel.send(embedMessage('Error', 'User not found.', 'RED'));
        }

        const role = message.guild.roles.cache.find(r => r.name === ERROR_ROLE_NAME);
        if (!role || !member.roles.cache.has(role.id)) {
            return message.channel.send(embedMessage('Error', 'The user does not have the "error" role.', 'RED'));
        }

        await member.roles.remove(role);
        const db = readDatabase();
        delete db[user.id];
        writeDatabase(db);
        logAction(`Removed "error" role from ${user.tag} manually.`);
        message.channel.send(embedMessage('Success', `${user.tag} has had the "error" role removed manually.`, 'GREEN'));
        user.send(embedMessage('Notification', 'Your "error" role has been removed manually.', 'GREEN'));
    }

    if (command === 'listerrors') {
        const db = readDatabase();
        const entries = Object.entries(db);
        if (entries.length === 0) {
            return message.channel.send(embedMessage('Info', 'No users currently have the "error" role.', 'BLUE'));
        }

        const errorList = entries.map(([userId, data]) => {
            const user = client.users.cache.get(userId);
            const timeLeft = (data.time - Date.now()) / 60000;
            return `${user.tag}: ${Math.round(timeLeft)} minutes left. Reason: ${data.reason}`;
        }).join('\n');

        message.channel.send(embedMessage('Users with "Error" Role', errorList, 'BLUE'));
    }
});

async function checkRoles() {
    const now = Date.now();
    const db = readDatabase();
    const updatedDb = { ...db };

    for (const [userId, data] of Object.entries(db)) {
        if (data.time < now) {
            const guild = client.guilds.cache.first(); // Assuming single guild bot
            const member = guild.members.cache.get(userId);
            const role = guild.roles.cache.find(r => r.name === ERROR_ROLE_NAME);

            if (member && role) {
                await member.roles.remove(role);
                logAction(`Automatically removed "error" role from ${member.user.tag}.`);
                member.user.send(embedMessage('Notification', 'Your "error" role has been removed automatically.', 'GREEN'));
            }
            delete updatedDb[userId];
        }
    }

    writeDatabase(updatedDb);
}

function logAction(message) {
    const guild = client.guilds.cache.first(); // Assuming single guild bot
    const logChannel = guild.channels.cache.find(channel => channel.name === LOG_CHANNEL_NAME);
    if (logChannel) {
        logChannel.send(embedMessage('Log', message, 'YELLOW'));
    } else {
        console.log(message);
    }
}

function embedMessage(title, description, color) {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();
}
