const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const ffmpeg = require("fluent-ffmpeg");

const REGEX = /(?:https?:\/\/)?(?:www\.)?youtube\.(?:com|be)\/(?:watch\?v=|shorts\/)([a-zA-Z0-9_-]+)/;
const UPLOAD_LIMIT = 500; // Limit in MB

const YOUTUBE_API_KEY = 'AIzaSyCohWpXANBVdplSVe3XGnZvM_LvaLp5HfM'; // Replace with your YouTube API Key
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

function sanitizeFileName(fileName) {
  return fileName.replace(/[^\w\-\.\s]/g, "_").replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
}

async function getTopComments(videoId) {
  const response = await youtube.commentThreads.list({
    part: 'snippet',
    videoId: videoId,
    order: 'relevance',
    maxResults: 3
  });

  const comments = response.data.items.map(item => ({
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
    text: item.snippet.topLevelComment.snippet.textDisplay,
    likeCount: item.snippet.topLevelComment.snippet.likeCount
  }));

  return comments;
}

async function downloadVideo(info, format, filePath) {
  return new Promise((resolve, reject) => {
    const readStream = ytdl.downloadFromInfo(info, { format })
      .on("error", (err) => {
        console.error("Error during download:", err);
        fs.unlink(filePath, () => reject(err));
      });

    const writeStream = fs.createWriteStream(filePath);
    readStream.pipe(writeStream);

    readStream.on("progress", (chunkLength, downloaded, total) => {
      const percentage = ((downloaded / total) * 100).toFixed(2);
      const barLength = Math.ceil(percentage / 2);
      const bar = "=".repeat(barLength) + " ".repeat(50 - barLength);
      process.stdout.write(`\r[${bar}] ${percentage}%`);
    });

    writeStream.on("finish", () => resolve());
    writeStream.on("error", (err) => {
      console.error("Error writing to file:", err);
      fs.unlink(filePath, () => reject(err));
    });
  });
}

async function handleDownload(message, shortId) {
  const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${shortId}`);
  if (!info || !info.videoDetails) throw new Error("Invalid video");

  const title = info.videoDetails.title;
  const videoUrl = `https://www.youtube.com/watch?v=${shortId}`;
  let filePath = generateUniqueFilePath(title, info.formats[0].container);

  const format = await selectVideoFormat(info.formats);
  if (!format) throw new Error("No suitable video format found");

  const estimatedSizeMB = estimateFileSizeMB(format);
  if (estimatedSizeMB > UPLOAD_LIMIT) {
    console.log(`Estimated file size (${estimatedSizeMB} MB) exceeds the upload limit. Trying lower quality.`);
  }

  const downloadMessage = await message.channel.send("Downloading video...");
  try {
    await downloadVideo(info, format, filePath);

    const stats = fs.statSync(filePath);
    let fileSizeMB = stats.size / 1000 / 1000;

    if (fileSizeMB > UPLOAD_LIMIT) {
      console.log(`File size (${fileSizeMB} MB) exceeds upload limit. Compressing video...`);
      const compressedFilePath = filePath.replace(/\.[^/.]+$/, "") + "_compressed.mp4";
      await compressVideo(filePath, compressedFilePath);
      fs.unlinkSync(filePath); // Remove the original large file
      filePath = compressedFilePath;
      fileSizeMB = fs.statSync(filePath).size / 1000 / 1000;
    }

    const comments = await getTopComments(shortId);
    await postDownloadActions(message, downloadMessage, filePath, title, videoUrl, format.qualityLabel, comments);
  } catch (error) {
    console.error("Error handling download:", error);
    await message.channel.send(`Error downloading video: ${error.message}`);
  }
}

function generateUniqueFilePath(title, container) {
  let fileName = sanitizeFileName(`${title}.${container}`);
  let i = 1;
  while (fs.existsSync(fileName)) {
    fileName = sanitizeFileName(`${title} (${i}).${container}`);
    i++;
  }
  return path.join(__dirname, fileName);
}

async function selectVideoFormat(formats) {
  const qualityLabels = ["1080p", "720p", "480p"];
  for (const qualityLabel of qualityLabels) {
    const filteredFormats = ytdl.filterFormats(formats, (format) => {
      return format.hasVideo && format.hasAudio && format.qualityLabel === qualityLabel;
    });
    try {
      const chosenFormat = ytdl.chooseFormat(filteredFormats, { quality: "highestvideo" });
      if (estimateFileSizeMB(chosenFormat) <= UPLOAD_LIMIT) {
        return chosenFormat;
      }
    } catch (error) {
      console.error(`No ${qualityLabel} formats available or file size too large.`);
    }
  }
  
  // Try to find any suitable format if preferred qualities are not found
  const fallbackFormat = ytdl.chooseFormat(formats, { quality: "lowest" });
  if (estimateFileSizeMB(fallbackFormat) <= UPLOAD_LIMIT) {
    return fallbackFormat;
  }

  return null;
}

function estimateFileSizeMB(format) {
  const bitrate = format.bitrate || format.averageBitrate;
  const durationSeconds = format.approxDurationMs / 1000;
  const sizeBytes = (bitrate / 8) * durationSeconds;
  return sizeBytes / 1000 / 1000; // Convert to MB
}

async function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-c:v libx264",
        "-crf 28",
        "-preset fast",
        "-c:a aac",
        "-b:a 128k"
      ])
      .save(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err));
  });
}

async function postDownloadActions(message, downloadMessage, filePath, title, videoUrl, qualityLabel, comments) {
  const stats = fs.statSync(filePath);
  const fileSizeMB = stats.size / 1000 / 1000;
  console.log(`File size: ${fileSizeMB} MB`);

  if (fileSizeMB > UPLOAD_LIMIT) {
    console.log(`File size is larger than upload limit. Deleting file.`);
    fs.unlinkSync(filePath);
    throw new Error("File size exceeds upload limit");
  }

  await message.delete();
  await downloadMessage.delete();

  const colors = ["fix", "diff", "css"]; // Different languages for different color highlights
  let commentsMessage = "**Top 3 comments:**\n";
  comments.forEach((comment, index) => {
    commentsMessage += `\`\`\`${colors[index % colors.length]}\n${index + 1}. ${comment.author}:\n${comment.text}\nLikes: ${comment.likeCount}\n\`\`\`\n`;
  });

  await message.channel.send({
    content: `Video downloaded: [${sanitizeFileName(title)}](<${videoUrl}>) | ${qualityLabel}\n${commentsMessage}`,
    files: [filePath]
  });
  fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting file:", err);
  });
}

module.exports = {
  help: {
    name: "dwl",
    description: "Download YouTube Videos",
    usage: `dwl <url or id>`,
    example: `dwl https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  },
  conf: {
    aliases: [],
    cooldown: 5 
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
      await handleDownload(message, shortId);
    } catch (error) {
      console.error("Error in run function:", error);
      await message.channel.send(`An error occurred: ${error.message}`);
    }
  }
};
