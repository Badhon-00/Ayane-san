const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

(module.exports.config = {
  name: "imgur",
  version: "6.9",
  author: "Badhon",
  countDown: 5,
  role: 0,
  category: "media",
  description: "convert image/video into Imgur link",
  category: "tools",
  usages: "reply [image, video]",
}),
  (module.exports.onStart = async function ({ api, event }) {
    const dip = event.messageReply?.attachments[0]?.url;
    if (!dip) {
      return api.sendMessage(
        "𝙺𝙾𝙽 𝙿𝙸𝙲 𝙱𝙰 𝚅𝙸𝙳𝙴𝙾 𝙻𝙸𝙽𝙺 𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙺𝙾𝚁𝚃𝙴 𝙲𝙷𝙰𝚆 𝙾𝙸𝚃𝙰 𝚂𝙴𝙽𝙳 𝙺𝙾𝚁𝙴 𝚁𝙴𝙿𝙻𝚈 𝙳𝙴𝚆💦",
        event.threadID,
        event.messageID,
      );
    }
    try {
      const res = await axios.get(
        `${await baseApiUrl()}/imgur?url=${encodeURIComponent(dip)}`,
      );
      const dipto = res.data.data;
      api.sendMessage(dipto, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        "𝙱𝙰𝙱𝚈!! 😫 𝙸 𝙵𝙰𝙸𝙻𝙴𝙳 𝚃𝙾 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙸𝚃 𝚃𝙾 𝙻𝙸𝙽𝙺🥺",
        event.threadID,
        event.messageID,
      );
    }
  });
