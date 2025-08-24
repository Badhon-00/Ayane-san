const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: Object.freeze({
    name: "help",
    version: "1.20",
    author: "✦ 𝗕𝗔𝗗𝗛𝗢𝗡 𝗥𝗢𝗛𝗠𝗔𝗡 ✦",
    countDown: 5,
    role: 0,
    shortDescription: { en: "📖 View command usage" },
    longDescription: { en: "📜 View command usage and list all commands" },
    category: "ℹ️ Info",
    guide: { en: "✦ {pn} [page] | {pn} [command] | {pn} -a [author] | {pn} -c [category]" },
    priority: 1,
  }),

  onStart: async function ({ message, args, event, role, api }) {
    const { threadID, messageID } = event;
    const prefix = getPrefix(threadID);

    if (!global.helpMessageIDs) {
      global.helpMessageIDs = {};
    }
    if (!global.helpMessageIDs[threadID]) {
      global.helpMessageIDs[threadID] = [];
    }

    const previousMessages = global.helpMessageIDs[threadID] || [];
    for (const msgID of previousMessages) {
      try {
        await api.unsendMessage(msgID);
      } catch (e) {

      }
    }

    global.helpMessageIDs[threadID] = [];

    let filterAuthor = null;
    let filterCategory = null;
    let page = 1;

    if (args[0] === "-a" && args[1]) {
      filterAuthor = args.slice(1).join(" ").toLowerCase();
    } else if (args[0] === "-c" && args[1]) {
      filterCategory = args.slice(1).join(" ").toLowerCase();
    } else if (!isNaN(args[0])) {
      page = parseInt(args[0]);
    } else if (args.length > 0 && !args[0].startsWith("-")) {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));
      if (!command) return message.reply(`❌ Command "${commandName}" not found.`);

      const configCommand = command.config;
      const roleText = roleTextToString(configCommand.role);
      const usage = (configCommand.guide?.en || "No guide available.")
        .replace(/{pn}/g, prefix)
        .replace(/{n}/g, configCommand.name);

      const replyMsg = await message.reply(
`╭──「 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐇𝐄𝐋𝐏 」──⦿
┃ ✦ 𝗡𝗮𝗺𝗲: ${configCommand.name}
┃ ✦ 𝗗𝗲𝘀𝗰: ${configCommand.longDescription?.en || "No description"}
┃ ✦ 𝗔𝗹𝗶𝗮𝘀𝗲𝘀: ${configCommand.aliases?.join(", ") || "None"}
┃ ✦ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
┃ ✦ 𝗥𝗼𝗹𝗲: ${roleText}
┃ ✦ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: ${configCommand.countDown || 1}s
┃ ✦ 𝗔𝘂𝘁𝗵𝗼𝗿: ${configCommand.author || "Unknown"}
┃ ✦ 𝗨𝘀𝗮𝗴𝗲: ${usage}
╰────「 𝗠𝗘𝗟𝗜𝗦𝗔 𝗕𝗕'𝗘 」───⦿`
      );

      global.helpMessageIDs[threadID].push(replyMsg.messageID);

      setTimeout(async () => {
        try {
          await api.unsendMessage(replyMsg.messageID);
          global.helpMessageIDs[threadID] = global.helpMessageIDs[threadID].filter(id => id !== replyMsg.messageID);
        } catch (e) {
          // Error handling
        }
      }, 60000);

      return;
    }

    const allCommands = [];
    let total = 0;

    for (const [name, value] of commands) {
      const config = value.config;
      if (config.role > 1 && role < config.role) continue;
      if (filterAuthor && (config.author?.toLowerCase() !== filterAuthor)) continue;
      if (filterCategory && (config.category?.toLowerCase() !== filterCategory)) continue;

      allCommands.push({
        name,
        category: config.category || "Uncategorized"
      });
      total++;
    }

    if (total === 0) {
      const filterMsg = filterAuthor ? `author "${filterAuthor}"` : `category "${filterCategory}"`;
      return message.reply(`❌ No commands found for ${filterMsg}.`);
    }

    allCommands.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

    const categories = {};
    for (const cmd of allCommands) {
      if (!categories[cmd.category]) {
        categories[cmd.category] = [];
      }
      categories[cmd.category].push(cmd.name);
    }

    const commandsPerPage = 20;
    const totalPages = Math.ceil(total / commandsPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const startIndex = (page - 1) * commandsPerPage;
    const endIndex = Math.min(startIndex + commandsPerPage, total);

    let msg = `╭━━━  -ღ´🦋𝗠𝗲𝗹𝗶𝘀𝗮🍒🥂  ━━━╮\n` +
              `┃ 🔰 Total Commands: ${total}\n` +
              `┃ 📥 Use: ${prefix}help [command] or ${prefix}help [page]\n` +
              `┃ 📄 Page: ${page}/${totalPages}\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
              `╭──「 𝗠𝗘𝗟𝗜𝗦𝗔 𝗕𝗕'𝗘 𝗛𝗘𝗟𝗣 𝗠𝗘𝗡𝗨 」─⦿\n`;

    let count = 0;
    let displayed = 0;
    let currentCategory = "";

    for (const category of Object.keys(categories).sort()) {
      const categoryCommands = categories[category];

      if (count + categoryCommands.length > startIndex || 
          (count <= startIndex && count + categoryCommands.length >= startIndex)) {

        for (const cmd of categoryCommands) {
          count++;

          if (count > startIndex && count <= endIndex) {
            if (currentCategory !== category) {
              if (displayed > 0) {
                msg += `┃\n`;
              }
              msg += `┃ ✦ 📂 ${category.toUpperCase()}\n`;
              currentCategory = category;
            }

            msg += `┃ ✦ ⚙️ ${cmd}\n`;
            displayed++;
          }

          if (count >= endIndex) break;
        }
      } else {
        count += categoryCommands.length;
      }

      if (count >= endIndex) break;
    }

    msg += `┃\n`;
    msg += `┃ ✦ 📄 𝗣𝗮𝗴𝗲: ${page}/${totalPages}\n`;
    msg += `┃ ✦ 📊 𝗧𝗼𝘁𝗮𝗹: ${total} commands\n`;

    if (totalPages > 1) {
      msg += `┃ ✦ 🔄 𝗨𝘀𝗲: ${prefix}help <page>\n`;
    }

    msg += `╰───「 𝗠𝗘𝗟𝗜𝗦𝗔 𝗕𝗕'𝗘 」──⦿`;

    const replyMsg = await message.reply(msg);

    global.helpMessageIDs[threadID].push(replyMsg.messageID);

    setTimeout(async () => {
      try {
        await api.unsendMessage(replyMsg.messageID);
        global.helpMessageIDs[threadID] = global.helpMessageIDs[threadID].filter(id => id !== replyMsg.messageID);
      } catch (e) {

      }
    }, 60000);
  },
};

function roleTextToString(role) {
  switch (role) {
    case 0: return "👥 All Users";
    case 1: return "👑 Group Admins";
    case 2: return "🤖 Bot Admins";
    default: return "🔒 Unknown Role";
  }
}