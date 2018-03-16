const Discord = require('discord.js');
const opus = require('opusscript');
const ytdl = require('ytdl-core');
// let reddit = require('reddit.js');
let fs = require('fs');
let xp = require("./rpg_elements/xp.json");
let coins = require("./rpg_elements/coins.json");
// var Music = require('discord.js-musicbot-addon');
var client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  // client.user.setGame(`on ${client.guilds.size} servers`);
  client.user.setGame('+help');

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  // client.user.setGame(`on ${client.guilds.size} servers`);
  client.user.setGame('+help');

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  // client.user.setGame(`on ${client.guilds.size} servers`);
  client.user.setGame('+help');
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if (command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if (command === "help") {
    let commands = "```";
    commands += "PREFIX == + ";
    commands += "\nCOMMANDS == ";
    commands += "\n-ping -> pings the bot"
    commands += "\n-help -> displays this message"
    commands += "\n-avatar -> links your avatar"
    commands += "\n-rng [arg1] [arg2] -> returns a random number between arg1 and arg2"
    commands += "\n-should i -> returns a random answer, just like a true 8ball"
    commands += "\n-coinflip -> returns heads or tails randomly"
    commands += "\n-owner -> returns the bot owner github"
    commands += "\n-triggered -> returns a string (meme)"
    commands += "\n-lamren -> returns a twitch clip from Lamren"
    commands += "\n-breakfast -> bot joins channel you are in and plays audio queue (meme)"
    commands += "\n-normie -> bot joins channel you are in and plays audio queue (meme)"
    commands += "\n-himedoll -> returns a troll for Himedoll and joins channel you are in and plays audio queue (meme)"
    commands += "\n-wtf -> bot joins channel you are in and plays audio queue (meme)"
    commands += "\n-disgusting -> bot joins channel you are in and plays audio queue (meme)"
    commands += "\n-play [link] -> bot joins channel you are in and plays a youtube video"
    commands += "\n-leave -> forces the bot to leave the vocal channel"
    commands += "\n-mute @mention -> mutes the mentioned user"
    commands += "\n-userinfo -> shows your userinfo"
    commands += "\n-userinfo @mention -> shows the mentioned user's info"
    commands += "\n-serverinfo -> shows the server info"
    commands += "\n-say [message] -> makes the bot say something and deletes your message"
    commands += "\n-kick @mention -> kicks the mentioned user"
    commands += "\n-ban @mention -> bans the mentioned user"
    commands += "\n-purge [number between 2 and 100] -> bot deletes the specified number of messages"
    commands += "\n-xp -> shows your xp and level.\n"
    commands += "\nADDITIONS =="
    commands += "\n-The bot has an anti swearing filter, it doesn't need any prefixes, once someone swears in the public chat, the bot will react with a random gif"
    commands += "\n-The bot awards you with xp for each message you post on the channel, for now it's only for fun"
    commands += "```"
    message.channel.send(commands);
  }

  if (command === "test1") {
    message.channel.send("test reply");
  }

  // if (command === "meme") {
  //   reddit.random("funny").fetch(function(res) {
  //   console.log(res);
  // });
  // }

  // Shows users avatar
  if (command === "avatar") {
    message.channel.send(message.author.avatarURL);
  }

  let rngFunc = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  if (command === "rng") {
    let min = Math.min(args[0], args[1]);
    let max = Math.max(args[0], args[1]);
    // let result = Math.floor(Math.random() * (max - min) + min);
    message.channel.send(rngFunc(min, max));
  }

  if (command === "should") {
    let answers = [
      "yes",
      "no",
      "maybe",
      "i can't asnwer it right now",
      "fuck off already",
      "don't",
      "please do",
      "lemme smash",
      "you should try",
      "this is foolish",
      "stop",
      "bitch disgusting",
      "are you dumb?",
      "are you kidding?",
      "im only a bot, what do you expect from me?"
    ];
    if (args[0] == "i" || args[0] == "I") {
      message.channel.send(answers[Math.floor(Math.random() * answers.length)]);
    } else if (!args[0]) {
      message.channel.send("Should what?");
    } else {
      message.channel.send("Ask for yourself, not others");
    }
  }

  if (command === "coinflip") {
    const coin = ["head", "tail"];
    message.channel.send(coin[Math.floor(Math.random() * 2)]);
  }

  if (command === "owner") {
    message.channel.send("https://github.com/yadrychnikovNicolay");
  }

  if (command === "triggered") {
    message.channel.send("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  }

  if (command === "lamren") {
    message.channel.send("https://clips.twitch.tv/GiftedHumbleJackalOpieOP");
  }

  // meme command, what am i doing with my fucking life?
  if (command === "breakfast") {
    // message.channel.send("https://www.youtube.com/watch?v=cgtxdMSCjZk");
    let voiceChannel = message.member.voiceChannel;
    try {
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./music/breakfast.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        })
    }
    catch(error) {
      console.log("no vocal channel to join");
    }
  }

  if (command === "normie") {
    // message.channel.send("https://www.youtube.com/watch?v=cgtxdMSCjZk");
    let voiceChannel = message.member.voiceChannel;
    try {
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./music/normie.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        })
    }
    catch(error) {
      console.log("no vocal channel to join");
    }
  }

  // LOOK AT THAT FATASS
  if (command === "himedoll") {
    // message.channel.send("https://www.youtube.com/watch?v=cgtxdMSCjZk");
    message.channel.send("http://www.dictionary.com/browse/fatty");
    let voiceChannel = message.member.voiceChannel;
    try {
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./music/sheep.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        })
    }
    catch(error) {
      console.log("no vocal channel to join");
    }
  }

  // WHAT THE FUCK
  if (command === "wtf") {
    let voiceChannel = message.member.voiceChannel;
    try {
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./music/wtf.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        })
    }
    catch(error) {
      console.log("no vocal channel to join");
    }
  }

  // BITCH DISGUSTING
  if (command === "disgusting") {
    let voiceChannel = message.member.voiceChannel;
    try {
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./music/disg.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        })
    }
    catch(error) {
      console.log("no vocal channel to join");
    }
  }

  // YOUTUBE INTEGRATION
  if (command === "play") {
    const streamOptions = {
      seek: 0,
      volume: 1
    };
    const broadcast = client.createVoiceBroadcast();
    let voiceChannel = message.member.voiceChannel;
    let link = args[0];
    voiceChannel.join()
      .then(connection => {
        const stream = ytdl(link, {
          filter: 'audioonly'
        });
        broadcast.playStream(stream);
        const dispatcher = connection.playBroadcast(broadcast);
      })
  }

  // TODO figure out how this shit works
  // const music = new Music(client, {
  //   youtubeKey: 'AIzaSyBdUwnPDU4GNnJv_HKKdv8vIMKhrx7JM_o'
  // });

  // leave command for the bot, in case he's stuck in a channel for whatever reason
  if (command === "leave") {
    let voiceChannel = message.member.voiceChannel;
    voiceChannel.leave();
  }

  // MUTE COMMAND TODO UNMUTE COMMAND
  if (command === "mute") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Permission denied");
    // if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"));
    let toMute = message.guild.member(message.mentions.users.first());
    if (!toMute) return message.channel.send("Specify a member please");
    let role = message.guild.roles.find(r => r.name === "botMuted");
    if (!role) {
      try {
        role = await message.guild.createRole({
          name: "botMuted",
          color: "#000000",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    if (toMute.roles.has(role.id)) return message.channel.send("Already muted");
    await toMute.addRole(role);
    message.channel.send("User muted");
    return;
  }

  // GIVES USER INFO, returns yours if you do not specify anything
  if (command === "userinfo") {
    let toShow = message.mentions.users.first();
    if (!toShow) {
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("vvv User infos vvv")
        .setColor("#4286f4")
        .addField("Full username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Created at", message.author.createdAt);
      message.channel.send(embed);
    } else {
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("vvv User infos vvv")
        .setColor("#4286f4")
        .addField("Full username", `${toShow.username}#${toShow.discriminator}`)
        .addField("ID", toShow.id)
        .addField("Created at", toShow.createdAt);
      message.channel.send(embed);
    }
  }

  // GIVES SERVER INFO
  if (command === "serverinfo") {
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setDescription("vvv Server infos vvv")
      .setColor("#FF0000")
      .addField("Server name", `${message.guild.name}`)
      .addField("Server icon", `${message.guild.iconURL}`)
      .addField("Server ID", `${message.guild.id}`)
      .addField("Server owner", `${message.guild.owner}`)
      .addField("Server region", `${message.guild.region}`)
      .addField("Member count", `${message.guild.memberCount}`)
      .addField("Created at", `${message.guild.createdAt}`)
      .addField("Afk channel", `${message.guild.afkChannel}`)
    message.channel.send(embed);
  }

  // MAKES THE BOT SAY SOMETHING
  if (command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o => {});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  // if(command === "kick") {
  //   // This command must be limited to mods and admins. In this example we just hardcode the role names.
  //   // Please read on Array.some() to understand this bit:
  //   // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
  //   if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
  //     return message.reply("Sorry, you don't have permissions to use this!");
  //
  //   // Let's first check if we have a member and if we can kick them!
  //   // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
  //   let member = message.mentions.members.first();
  //   if(!member)
  //     return message.reply("Please mention a valid member of this server");
  //   if(!member.kickable)
  //     return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
  //
  //   // slice(1) removes the first part, which here should be the user mention!
  //   let reason = args.slice(1).join(' ');
  //   if(!reason)
  //     return message.reply("Please indicate a reason for the kick!");
  //
  //   // Now, time for a swift kick in the nuts!
  //   await member.kick(reason)
  //     .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  //   message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  //
  // }

  // if(command === "ban") {
  //   // Most of this command is identical to kick, except that here we'll only let admins do it.
  //   // In the real world mods could ban too, but this is just an example, right? ;)
  //   if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
  //     return message.reply("Sorry, you don't have permissions to use this!");
  //
  //   let member = message.mentions.members.first();
  //   if(!member)
  //     return message.reply("Please mention a valid member of this server");
  //   if(!member.bannable)
  //     return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  //
  //   let reason = args.slice(1).join(' ');
  //   if(!reason)
  //     return message.reply("Please indicate a reason for the ban!");
  //
  //   await member.ban(reason)
  //     .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  //   message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  // }


  // PURGE THEM COMMANDS
  if (command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({
      count: deleteCount
    });
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  // XP SYSTEM
  let xpAdd = Math.floor(Math.random() * 10) + 10;
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nextLevelXp = curlvl * 500;
  let difference = nextLevelXp - curxp;
  xp[message.author.id].xp = curxp + xpAdd;
  if (command === "xp") {
    let xpInfo = new Discord.RichEmbed()
      .setTitle(`${message.author.username}'s stats`)
      .setColor("#000000")
      .addField("Current xp : ", `${curxp}`)
      .addField("Current level : ", `${curlvl}`)
      .setFooter(`${difference}XP til level up`, message.author.displayAvatarURL);
    message.channel.send(xpInfo);
  }
});


// NO PREFIX ZONE
client.on("message", async message => {
  const args = message.content.trim().split(/ +/g);
  // RNG FUNCTION
  let rngFunc = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const swearWords = ["damn", "suck", "fuck", "shit", "indi"];
  if (swearWords.some(word => message.content.includes(word))) {
    const replies = ["https://media.giphy.com/media/3BL45MJDZABqg/giphy.gif",
      "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif",
      "https://media.giphy.com/media/3og0IN2YJFptu9DQAw/giphy.gif",
      "https://media.giphy.com/media/mQNcvtxus4cBW/giphy.gif",
      "https://media.giphy.com/media/yXIeZ0EH2hORG/giphy.gif"
    ];
    message.reply(replies[Math.floor(Math.random() * replies.length)]);
    // Or just do message.delete();
  }

  // Checks if user has an xp object initialized
  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  // XP SYSTEM
  let xpAdd = 0;
  if (args.length >= 10){
     xpAdd = rngFunc(50, 100);
  } else if (args.length >= 5){
     xpAdd = rngFunc(25, 40);
  } else if (args.length > 1){
    xpAdd = rngFunc(5, 15);
  } else {
    xpAdd = 2;
  }
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nextLevelXp = curlvl * 500;
  xp[message.author.id].xp = curxp + xpAdd;
  if (nextLevelXp <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor("#555555")
      .addField("New Level", curlvl + 1)
    message.channel.send(lvlup);
  }
  fs.writeFile("./rpg_elements/xp.json", JSON.stringify(xp), (error) => {
    if (error) console.log(error)
  });

  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0,
      gems: 0,
      ultraGems: 0
    };
  }

  let chanceGem = rngFunc(1, 300);
  if (chanceGem == 73) {
    coins[message.author.id].gems++;
  }
  let curcoins = coins[message.author.id].coins;
  let curgems = coins[message.author.id].gems;
  let coinAdd = rngFunc(10, 20);
  coins[message.author.id].coins = curcoins + coinAdd;
  fs.writeFile("./rpg_elements/coins.json", JSON.stringify(coins), (error) => {
    if (error) console.log(error);
  });

});

client.login(config.token);
