const Discord = require('discord.js');
const { token } = require('./config/config');
const commandHandler = require('./handlers/command.handler');

const client = new Discord.Client();

//Initialize command handler
commandHandler(client);

client.on('ready', () => {
  console.log('Lubię ciasteczka!');
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.login(token);

//Error handler - omitting crushes
client.on('debug', () => {});
client.on('error', () => {});
client.on('warn', () => {});
