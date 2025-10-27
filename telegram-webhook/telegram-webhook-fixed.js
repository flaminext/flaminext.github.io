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

    log("Request object keys:", Object.keys(req));
    log("Request body type:", typeof req.body);
    log("Request body value:", req.body);

    // Handle request body - Appwrite Functions provide bodyJson for parsed JSON
    let update;
    if (req.bodyJson) {
      update = req.bodyJson;
      log("Using bodyJson:", JSON.stringify(update, null, 2));
    } else if (req.body && typeof req.body === "string" && req.body.trim()) {
      try {
        update = JSON.parse(req.body);
        log("Parsed body string:", JSON.stringify(update, null, 2));
      } catch (e) {
        log("Failed to parse req.body as JSON string:", req.body);
        return res.json({
          success: false,
          error: "Invalid JSON in request body",
        });
      }
    } else {
      log("No valid body found in request. Available body properties:", {
        body: req.body,
        bodyText: req.bodyText,
        bodyRaw: req.bodyRaw,
      });
      return res.json({ success: false, error: "No request body" });
    }

    log("Received Telegram update:", JSON.stringify(update, null, 2));

    if (update.message && update.message.reply_to_message) {
      const replyMessage = update.message;
      const originalMessage = update.message.reply_to_message;
      const messageText = originalMessage.text || "";
      const userIdMatch = messageText.match(/🆔 \*\*User ID:\*\* (\w+)/);

      if (userIdMatch) {
        const userId = userIdMatch[1];
        const adminReply = replyMessage.text;

        log(`Admin reply detected for user ${userId}: ${adminReply}`);

        const documentId = `admin_reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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

    return res.json({ success: true, message: "Update received" });
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
