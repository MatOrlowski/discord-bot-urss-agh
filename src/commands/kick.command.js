const {
  Permissions: { FLAGS },
} = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick user',
  args: true,
  usage: '<użytkownik> [powód]',
  botPermissions: [FLAGS.KICK_MEMBERS],
  userPermissions: [FLAGS.KICK_MEMBERS],

  run(msg, args) {
    const { channel, guild, author, mentions } = msg;

    const userToKick = mentions.users.first();

    const reasonArg = [...args].slice(1).join(' ');

    if (!userToKick) return msg.reply('Musisz podać użytkownika.');

    if (userToKick.id === author.id)
      return msg.reply('Nie możesz  wyrzucić siebie!');

    const memberToKick = guild.members.cache.get(userToKick.id);

    if (!memberToKick.kickable)
      return channel.send('Nie można wyrzucić tego użytkownika.');

    memberToKick.kick(reasonArg).then((kickedUser) => {
      channel.send(
        `Użytkownik \`${kickedUser.displayName}\` został wyrzucony. ${
          reasonArg ? `Powód: \`${reasonArg}\`` : ''
        }`
      );
    });
  },
};
