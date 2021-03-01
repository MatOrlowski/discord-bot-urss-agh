const {
  Permissions: { FLAGS },
} = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Delete messages in channel',
  args: true,
  usage: '<amount>',
  botPermissions: [FLAGS.MANAGE_MESSAGES],
  userPermissions: [FLAGS.MANAGE_MESSAGES],

  run(msg, args) {
    const { channel, member } = msg;

    console.log('user', member.permissionsIn(channel).has(['MANAGE_MESSAGES']));

    //Check if user has permission to delete message
    if (!member.permissionsIn(channel).has([FLAGS.ADMINISTRATOR])) {
      return msg.replay('Nie masz wystarczających uprawnień!');
    }
    const amount = parseInt(args[0]);

    if (!Number.isInteger(amount)) {
      return channel.send('Musisz określić liczbę wiadomości do usunięcia!');
    }

    if (amount > 30) {
      return channel.send(
        'Możesz usunąć maksymalnie 30 wiadomości jednocześnie.'
      );
    }

    channel.bulkDelete(amount);
  },
};
