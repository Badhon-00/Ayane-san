const { getTime, drive } = global.utils;

module.exports = {
    config: {
        name: "leave",
        version: "2.0",
        author: "NTKhang",
        category: "events",
        description: "Sends a stylish notification when someone leaves the group"
    },

    langs: {
        vi: {
            session1: "sáng",
            session2: "trưa",
            session3: "chiều",
            session4: "tối",
            leaveType1: "tự rời",
            leaveType2: "bị kick",
            defaultLeaveMessage: "{userName} đã {type} khỏi nhóm"
        },
        en: {
            session1: "morning",
            session2: "noon",
            session3: "afternoon",
            session4: "evening",
            leaveType1: "left",
            leaveType2: "was kicked from",
            defaultLeaveMessage: "➤ {userName} has {type} the group",
            funnyMessages: [
                "🚪 {userName} sneaked out! Wife called maybe? 😜",
                "🚨 ALERT! {userName} escaped! 🏃‍♂️",
                "👋 Bye {userName}! We'll upgrade now! 😏",
                "😢 {userName} left! Our group bully is gone!",
                "💔 {userName} betrayed us! Never trusting again!",
                "👑 Badhon boss kicked {userName} with his royal lathi! 😂",
                "👢 {userName} got the boot from Badhon boss!",
                "☢️ {userName} was too toxic - Badhon boss removed them!",
                "🔥 {userName} couldn't handle the heat!"
            ]
        },
        bn: {
            session1: "সকাল",
            session2: "দুপুর",
            session3: "বিকাল",
            session4: "রাত",
            leaveType1: "চলে গেল",
            leaveType2: "কেkick দেওয়া হলো",
            defaultLeaveMessage: "➤ {userName} গ্রুপ {type} 😂",
            funnyMessages: [
                "🚪 {userName} পালালো! বউ ডাক দিয়েছে নাকি? 😜",
                "🏃‍♂️ ওরে {userName} পালাইছে! ধররে!",
                "👋 {userName} চলে গেল! এখন কাকে পিটাবো? 😈",
                "😢 {userName} ভাই, ফিরে আসো!",
                "💔 {userName} বিশ্বাসঘাতক!",
                "👑 বাঁধন বস লাথি মেরে {userName} কে বের করে দিল! 😂",
                "🦵 {userName} রে বাঁধন বসের লাথি খাইয়া উধাও!",
                "☢️ {userName} বেশি টক্সিক হয়ে গেছিল!",
                "🔥 {userName} পারলোনা, তাই পালালো!"
            ]
        }
    },

    onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
        if (event.logMessageType !== "log:unsubscribe") return;
        
        const { threadID } = event;
        const threadData = await threadsData.get(threadID);
        if (!threadData.settings.sendLeaveMessage) return;
        
        const { leftParticipantFbId } = event.logMessageData;
        if (leftParticipantFbId == api.getCurrentUserID()) return;
        
        const hours = getTime("HH");
        const threadName = threadData.threadName;
        const userName = await usersData.getName(leftParticipantFbId);
        const isSelfLeave = leftParticipantFbId == event.author;
        const leaveType = getLang(isSelfLeave ? "leaveType1" : "leaveType2");

        
        let leaveMessage;
        if (getLang("funnyMessages")) {
            const funnyMessages = getLang("funnyMessages");
            leaveMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        } else {
            leaveMessage = threadData.data.leaveMessage || getLang("defaultLeaveMessage");
        }

        
        const formattedMessage = `
━━━━━━━━━━━━━━━
  ✧ GROUP NOTIFICATION ✧
━━━━━━━━━━━━━━━

${leaveMessage
    .replace(/\{userName\}|\{userNameTag\}/g, userName)
    .replace(/\{type\}/g, leaveType)
    .replace(/\{threadName\}|\{boxName\}/g, threadName)
    .replace(/\{time\}/g, hours)
    .replace(/\{session\}/g, 
        hours <= 10 ? getLang("session1") :
        hours <= 12 ? getLang("session2") :
        hours <= 18 ? getLang("session3") : getLang("session4")
    )}

━━━━━━━━━━━━━━━
⏰ Time: ${hours}:00 ${getLang(hours <= 12 ? "session2" : "session4")}
━━━━━━━━━━━━━━━
        `;

        const form = {
            body: formattedMessage,
            mentions: [{
                id: leftParticipantFbId,
                tag: userName
            }]
        };

        // Add attachment if available
        if (threadData.data.leaveAttachment) {
            const files = threadData.data.leaveAttachment;
            const attachments = await Promise.all(
                files.map(file => drive.getFile(file, "stream").catch(() => null))
            );
            form.attachment = attachments.filter(Boolean);
        }

        await message.send(form);
    }
};
