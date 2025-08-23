const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["files", "Melissa"],
		version: "1.0",
		author: "BADHON",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["61571421696077","61557409693409",];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage(" 𝙾𝙽𝙻𝚈 𝙱𝙰𝙳𝙷𝙾𝙽 𝙱𝙾𝚂𝚂 𝙷𝙰𝚅𝙴 𝙿𝙴𝚁𝙼𝙸𝚂𝚂𝙸𝙾𝙽 𝚃𝙾 𝚄𝚂𝙴 𝚃𝙷𝙸𝚂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳!! 🐤", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("𝙾𝙸 𝙼𝚄𝚁𝙺𝙷𝙾 𝙵𝙸𝙻𝙴 𝙴𝚁 𝙽𝙰𝙼 𝚃𝙷𝙸𝙺𝙼𝙾𝚃𝙾 𝙻𝙴𝙺𝙷 😾🎀 ", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`𝙰𝙸 𝙽𝙰𝙼𝙴 𝙰 𝙺𝙾𝙽𝙾 𝙵𝙸𝙻𝙴 𝙽𝙰𝙸 𝙱𝙰𝙱𝚈!! 🥺: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
