module.exports = {
	config: {
		name: "𝐁𝐀𝐃𝐇𝐎𝐍'𝐒 𝐈𝐍𝐅𝐎",
		version: "1.0",
		author: "💋𝗠𝗢𝗦𝗧𝗔𝗞𝗜𝗠 × 𝗕𝗔𝗗𝗛𝗢𝗡💀",
		countDown: 5,
		role: 0,
		shortDescription: "sarcasm",
		longDescription: "sarcasm",
		category: "reply",
	},
	onStart: async function () {},
	onChat: async function ({ event, message, getLang }) {
		const input = event.body?.toLowerCase();
		const triggers = ["Badhon" "melisa tmr boss ke" "tmr boss ke" "badhon ke" "Tomar boss ke"];

		const replies = [
			"𝐌𝐘 𝐎𝐖𝐍𝐄𝐑: 𝐁𝐀𝐃𝐇𝐎𝐍
      ╔                            ╗  
			 《 ⚙️ 𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎 》
			 ╚                            ╝
	    ╔═ ══════════════ ═╗
             🛡️ 𝐁𝐎𝐓 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 🛡️ 
          𝐎𝐏𝐄𝐑𝐀𝐓𝐎𝐑: 𝐁𝐀𝐃𝐇𝐎𝐍 
      ╚═ ══════════════ ═╝

       ═《 💬 𝐁𝐎𝐓 𝐈𝐍𝐓𝐑𝐎 💬 》═
 
 ✨𝗜 𝗔𝗠 𝗬𝗢𝗨𝗥 𝗙𝗔𝗩𝗢𝗨𝗥𝗜𝗧𝗘 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥                      𝗖𝗛𝗔𝗧𝗕𝗢𝗧✨  
       
               💙𝗠𝗬 𝗡𝗔𝗠𝗘 𝗜𝗦💙
               
               — ღ´🦋𝗠𝗲𝗹𝗶𝘀𝗮🍒🥂
               
                ═ ═════════ ═
  
👑  𝐌𝐘 𝐎𝐖𝐍𝐄𝐑: 𝐁𝐀𝐃𝐇𝐎𝐍

📡 𝐎𝐧𝐥𝐢𝐧𝐞: ✅  𝐎𝐍𝐋𝐈𝐍𝐄

📛 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: ღ´🦋𝗠𝗲𝗹𝗶𝘀𝗮🍒🥂
  
🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 1.0.0  
  
          
➤ 𝐏𝐫𝐞𝐟𝐢𝐱: ^  

 
  
╭─〔 🖥️ UPTIME REPORT 〕─╮
│
→ ⏱️ Total Uptime: ${formattedUptime}
│
→ 📊 Progress:
→ [ ${uptimeProgressBar} ] (${uptimePercent}%)
│
→ ⚡ Ping: ${ping}ms
→ 🤖 Bot Name: ღ´🦋𝗠𝗲𝗹𝗶𝘀𝗮🍒🥂
→ 🛠️ Version: v1.0
│
├─── 🔧 System Status 🔧 ───
→ 👥 User: ${userName}
→ 💻 CPU Load: ${cpuLoad}
→ 🧠 Memory: ${usedMemPercent}%
╰──────────────────────

━━━━━━━━━━━━━━━  
📘 COMMANDS: 148 
🔐 ADMINS ONLINE: ∞ 
🌍 USERS: ∞

━━━━━━━━━━━━━━━  
👑 𝐀𝐝𝐦𝐢𝐧 𝐍𝐚𝐦𝐞: 𝐁𝐀𝐃𝐇𝐎𝐍

🕌 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍: 𝐌𝐔𝐒𝐋𝐈𝐌

🎓 𝐒𝐓𝐔𝐃𝐘: 𝐒𝐓𝐔𝐃𝐄𝐍𝐓 (𝐂𝐋𝐀𝐒𝐒 10)

🇧🇩 𝐍𝐀𝐓𝐈𝐎𝐍𝐀𝐋𝐈𝐓𝐘: 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇𝐈

🏠 𝐀𝐃𝐃𝐑𝐄𝐒𝐒: 𝐒𝐈𝐃𝐃𝐇𝐈𝐑𝐆𝐀𝐍𝐉, 𝐍𝐀𝐑𝐀𝐘𝐀𝐍𝐆𝐀𝐍𝐉, 𝐒𝐈𝐆𝐍𝐁𝐎𝐀𝐑𝐃, 𝐔𝐓𝐓𝐀𝐑 𝐒𝐀𝐇𝐄𝐁 𝐏𝐀𝐑𝐀, 𝐇𝐀𝐉𝐈 𝐑𝐀𝐅𝐈𝐐 𝐒𝐇𝐀𝐑𝐎𝐊

🌍 𝐆𝐋𝐎𝐁𝐀𝐋 𝐑𝐎𝐋𝐄: 𝐀𝐋𝐋 𝐔𝐒𝐄𝐑𝐒 | 𝐀𝐍𝐃 𝐁𝐎𝐓   𝐎𝐖𝐍𝐄𝐑/𝐀𝐃𝐌𝐈𝐍  
━━━━━━━━━━━━━━━  

📎 𝐒𝐎𝐂𝐈𝐀𝐋𝐒 & 𝐂𝐎𝐍𝐓𝐀𝐂𝐓𝐒:

📸 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌: 𝐒𝐂𝐘𝐋4_𝐒𝐌0𝐊3

📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊: 𝐁𝐀𝐃𝐇𝐎𝐍 𝐄𝐗𝐈𝐒𝐓

📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊: 𝐁𝐀𝐃𝐇𝐎𝐍 𝐑𝐎𝐇𝐌𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
  
📨 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌: +8801533048946

▶️ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄: 𝐁𝐑𝐒 𝐘𝐓

🎮 𝐃𝐈𝐒𝐂𝐎𝐑𝐃: 𝐒𝐌𝐎𝐊𝐄𝐘𝐘𝐘_𝐁𝐀𝐃𝐇𝐎𝐍

📧 𝐄𝐌𝐀𝐈𝐋:𝐒𝐌𝐎𝐊𝐄𝐘𝐘𝐘𝐁𝐀𝐃𝐇𝐎𝐍1@𝐆𝐌𝐀𝐈𝐋.𝐂𝐎𝐌

📱 𝐏𝐇𝐎𝐍𝐄: +8801533048946

📞 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏:+8801533048946

━━━━━━━━━━━━━━━

📅 LAST RESTART: 2025-04-25 
 
🌐 SERVER ID: #83472
━━━━━━━━━━━━━━━"
		];

		if (triggers.includes(input)) {
			const randomReply = replies[Math.floor(Math.random() * replies.length)];
			return message.reply(randomReply);
		}
	}
};
