const { Client, Databases } = require("node-appwrite");

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint("https://syd.cloud.appwrite.io/v1")
      .setProject("68fd7edd003351068add")
      .setKey(
        "standard_7529c04c300a459b2b4b84a7e7e9e531cda00be40be422e5f6e7dfa249f35605f00a5896e5a599cd4fb824ad47e48185e0ee880c45a8ac2d48b4f2222a32b9844f76bbf0c42251989f6e7e5a6edc41026a28174f536780594792dfc46b1360c00a2f9389fc18ba1d2c929b7dad6dc37a2e31d46524511cb30046eb6308ca111c"
      );

    const databases = new Databases(client);

    // For testing, we'll pass data via query parameters or use mock data
    // In production, this would come from req.body

    // Mock Telegram update for testing
    const mockUpdate = {
      update_id: 123456789,
      message: {
        message_id: 123,
        from: {
          id: 123456789,
          is_bot: false,
          first_name: "Admin",
          username: "admin_user",
        },
        chat: {
          id: 123456789,
          first_name: "Admin",
          username: "admin_user",
          type: "private",
        },
        date: 1640995200,
        reply_to_message: {
          message_id: 122,
          from: {
            id: 987654321,
            is_bot: false,
            first_name: "User",
            username: "test_user",
          },
          chat: {
            id: 987654321,
            first_name: "User",
            username: "test_user",
            type: "private",
          },
          date: 1640995100,
          text: "🆔 **User ID:** abc123\nHello from user",
        },
        text: "Admin reply to user",
      },
    };

    const update = mockUpdate; // In production: JSON.parse(req.body) or from webhook
    log("Processing update:", JSON.stringify(update, null, 2));

    if (update.message && update.message.reply_to_message) {
      const replyMessage = update.message;
      const originalMessage = update.message.reply_to_message;
      const messageText = originalMessage.text || "";
      const userIdMatch = messageText.match(/🆔 \*\*User ID:\*\* (\w+)/);

      if (userIdMatch) {
        const userId = userIdMatch[1];
        const adminReply = replyMessage.text;

        log(`Admin reply detected for user ${userId}: ${adminReply}`);

        const documentId = `admin_reply_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        await databases.createDocument(
          "68fd81e0001207ff305f", // database ID
          "message", // collection ID
          documentId,
          {
            messageId: documentId,
            userId,
            displayName: "Admin",
            text: adminReply,
            timestamp: new Date().toISOString(),
            isFromUser: false,
            status: "sent",
          }
        );

        log("Admin reply saved to database successfully");

        return res.json({
          success: true,
          message: "Admin reply processed",
          userId,
          reply: adminReply,
          documentId,
        });
      } else {
        log("Could not extract user ID from original message");
        return res.json({
          success: false,
          message: "Could not extract user ID",
        });
      }
    }

    return res.json({
      success: true,
      message: "Update received (no reply detected)",
    });
  } catch (err) {
    error("Error processing webhook:", err.message);
    return res.json(
      {
        success: false,
        error: err.message,
      },
      500
    );
  }
};
