// const { Collection } = require('discord.js');
// const { readdirSync } = require('fs');
// const { prefix } = require(__dirname + '/../config/config.js');

// module.exports = (client) => {
//   //Commands Collection
//   client.commands = new Collection();

//   //Filter for all files w/ '.command' extension
//   const commandFiles = readdirSync(__dirname + '/../commands').filter((file) =>
//     file.endsWith('.command.js')
//   );

//   for (const file of commandFiles) {
//     const command = require(__dirname + `/../commands/${file}`);
//     if (command.name) {
//       client.commands.set(command.name, command);
//     } else {
//       continue;
//     }
//   }

//   //On message
//   client.on('message', (msg) => {
//     const { author, guild, channel } = msg;

//     //Check if author is a bot or message was sent in DM
//     if (author.bot || !guild) return;

//     //Ignore messages without prefix
//     if (!msg.content.startsWith(prefix)) return;

//     //Cutting prefix and setting arguments
//     const args = msg.content.slice(prefix.length).trim().split(/ +/g);
//     //Setting a single command
//     const cmdName = args.shift().toLowerCase();

//     //Check if command exists
//     if (!client.commands.has(cmdName)) return;
//     const cmd = client.commands.get(cmdName);

//     //Check if arguments are needed
//     if (cmd.args && !args.length) {
//       let reply = "You didn't provide any arguments!";
//       //Showing proper usage of command
//       if (cmd.usage) {
//         reply += `\nThe proper usage of command is: \`${prefix}${cmdName} ${cmd.usage}\``;
//       }
//       return msg.channel.send(reply);
//     }

//     //Executing command and catching error
//     try {
//       cmd.run(msg, args);
//     } catch (error) {
//       console.log(error);
//       msg.reply('Coś poszło nie tak...');
//     }

//     //Checck bot permissions
//     if (cmd.botPermissions && cmd.botPermissions.length > 0) {
//       if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
//         return channel.send(
//           `Nie masz wystarczających uprawnień. Brakujące uprawnienia: \`${cmd.botPermissions.join(
//             '`,`'
//           )}\`.`
//         );
//       }
//     }

//     //Checck user permissions
//     if (cmd.userPermissions && cmd.userPermissions.length > 0) {
//       if (!msg.member.permissionsIn(channel).has(cmd.userPermissions)) {
//         return msg.send(
//           `Nie masz wystarczających uprawnień. Brakujące uprawnienia: \`${cmd.userPermissions.join(
//             '`,`'
//           )}\`.`
//         );
//       }
//     }
//   });
// };
const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { prefix } = require(__dirname + '/../config/config.js');

module.exports = (client) => {
  //Commands
  client.commands = new Collection();

  //Filter for all files with extension '.command'
  const commandFiles = readdirSync(__dirname + '/../commands').filter((file) =>
    file.endsWith('.command.js')
  );

  for (const file of commandFiles) {
    const command = require(__dirname + `/../commands/${file}`);
    if (command.name) {
      client.commands.set(command.name, command);
    } else {
      continue;
    }
  }

  client.on('message', (msg) => {
    const { author, guild, channel } = msg;

    //Check if author is a bot
    if (author.bot || !guild) return;

    //Ignore messages without prefix
    if (msg.content.indexOf(prefix) !== 0) return;

    //Cutting prefix and setting arguments then setting a single command
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    //Check if command exists
    if (!client.commands.has(cmdName)) return;

    const cmd = client.commands.get(cmdName);
    //Check if arguments are needed
    if (cmd.args && !args.length) {
      let reply = 'Podaj argumety do komendy!';
      //Showing proper usage of command
      if (cmd.usage) {
        reply += `\nWłaściwe użyie komendy wygląda następująco: \`${prefix}${cmdName} ${cmd.usage}\``;
      }
      return msg.channel.send(reply);
    }

    //Executing command
    try {
      cmd.run(msg, args);
    } catch (error) {
      console.log(error);
      msg.reply('There was an error. Trying to execute that command.');
    }

    //Check bot permissions
    if (cmd.botPermissions && cmd.botPermissions.length > 0) {
      if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
        return channel.send(
          `Bot nie ma wystarczających uprawnień. Brakujące uprawnienia: \`${cmd.botPermissions.join(
            ',`'
          )}\.`
        );
      }
    }

    //Check user permissions
    if (cmd.userPermissions && cmd.userPermissions.length > 0) {
      if (!msg.member.permissionsIn(channel).has(cmd.userPermissions)) {
        return channel.send(
          `Nie masz wystarczających uprawnień. Brakujące uprawnienia: \`${cmd.userPermissions.join(
            ',`'
          )}\.`
        );
      }
    }
  });
};
