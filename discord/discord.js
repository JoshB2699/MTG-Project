const Discord = require("discord.js");
const client = new Discord.Client();
const reddit = require("redwrap");
const mongoose = require("mongoose");
const async = require('async');

const config = require('./config/config.js');
const Admin = require('./models/admin.js');
const Card = require('./models/card.js');


mongoose.connect(config.dbURL, {
  useMongoClient : true,
  user: 'mtgbot',
  pass: 'howdy'
});

mongoose.set('debug', true);


client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
  //ADD HERE - Find Command Prefix for the server.

  if (msg.content === config.commandPrefix + 'help') {
    require('./commands/help.js')(msg);
  }

  if (msg.content.startsWith(config.commandPrefix + "check")){
    require('./commands/check.js')(msg, config, Card);
  }

  //Add link command which accept card name (similarly to check, but tell you to retry the command), website and set and replies with a link.

  //Add find command which searches for the card in the db and replies with the details of the card.

  if(msg.content.startsWith(config.commandPrefix + "find")){
    require('./commands/find.js')(msg, config, Card);
  }

});

client.login(config.botToken);
