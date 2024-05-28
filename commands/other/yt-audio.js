const REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)(\w+)/;
const LIMIT = 500; 
const ytdl = require("ytdl-core");
const Discord = require("discord.js")
const fs = require("fs");
let filePath;
let readStream;
let writeStream;
const path = require("path");
let message;
let progressMessage;
 
 const ffmpeg = require("fluent-ffmpeg"); 
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;


let info;
let format;
module.exports = {
  help: {
    name: "dcv",
    description: "Download and convert a YouTube video to mp3",
    usage: `dcv <url or id>`,
    example: `dcv https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  },
  conf: {
    aliases: [],
    cooldown: 5 // Integer = second.
  },
  run: async (bot, message, args) => { 

    if (message.author.bot) return; 

    const input = args.join(" "); 

    const match = input.match(REGEX); 

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

       

      });

      writeStream.on("finish", async () => {

        if (downloaded === total) {
          // Delete the progress message and the command message
          await progressMessage.delete();
          await message.delete();

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



}