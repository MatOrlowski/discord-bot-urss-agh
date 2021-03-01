const {
  Permissions: { FLAGS },
} = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban user',
  args: true,
  usage: '<użytkownik> [dni(0-7)] [powód]',
  botPermissions: [FLAGS.BAN_MEMBERS],
  userPermissions: [FLAGS.BAN_MEMBERS],

  run(msg, args) {
    const { channel, guild, author, mentions } = msg;

    let daysArg = parseInt(arg[1]);
    if (!isNaN(daysArg)) {
      if (daysArg < 0) daysArg = 0;
      if (daysArg > 7) daysArg = 7;
    }

    const userToBan = mentions.users.first();

    const reasonArg = [...args].slice(isNan(daysArg) ? 1 : 2).join(' ');

    if (!userToBan) return msg.reply('Musisz podać użytkownika.');

    if (userToBan.id === author.id)
      return msg.reply('Nie możesz zbanować samego siebie!');

    const memberToBan = guild.members.cache.get(userToBan.id);

    if (!memberToBan.bannable)
      return channel.send('Nie można wyrzucić tego użytkownika.');

    const banOptions = {
      reason: reasonArg,
    };

    if (!isNan(daysArg)) banOptions = daysArg;

    memberToBan.ban(banOptions).then((bannedUser) => {
      channel.send(
        `Użytkownik \`${bannedUser.displayName}\` został zbanowany. ${
          reasonArg ? `Powód: \`${reasonArg}\`` : ''
        }`
      );
    });
  },
};
