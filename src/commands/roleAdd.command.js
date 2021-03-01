module.exports = {
  name: 'komisja',
  description: 'Adding role to user',
  args: true,
  usage: '<nazwa>',

  run(msg, args) {
    //Creating a message author
    const member = msg.member;
    //Importing ID for each role
    const { guildRoles } = require('../config/config');

    switch (args[0]) {
      case 'cyfryzacji':
        member.roles.add(guildRoles.Cyfryzacja.id);
        msg.reply('Przypisano do Komisji `Cyfryzacji`');
        break;
      case 'współpracy':
        member.roles.add(guildRoles.Współpraca.id);
        msg.reply('Przypisano do Komisji `Współpracy`');
        break;
      case 'rozwoju':
        member.roles.add(guildRoles.Rozwój.id);
        msg.reply('Przypisano do Komisji `Rozwoju`');
        break;
      case 'projektów':
        member.roles.add(guildRoles.Projekty.id);
        msg.reply('Przypisano do Komisji `Projektów`');
        break;
      case 'promocji':
        member.roles.add(guildRoles.Promocja.id);
        msg.reply('Przypisano do Komisji `Promocji`');
        break;
      case 'dydaktyki':
        member.roles.add(guildRoles.Dydaktyka.id);
        msg.reply('Przypisano do Komisji `Dydaktyki`');
        break;
      case 'sportu':
        member.roles.add(guildRoles.Sport.id);
        msg.reply('Przypisano do Komisji `Sportu`');
        break;
      case 'miasteczka studenckiego':
      case 'miasteczka':
        member.roles.add(guildRoles.Miasteczko.id);
        msg.reply('Przypisano do Komisji Miasteczka `Studenckiego`');
        break;
      default:
        msg.reply('Nie ma takiej komisji :/');
    }
  },
};
