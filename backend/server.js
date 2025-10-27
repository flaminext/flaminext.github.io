const express = require("express");
const cors = require("cors");
const { Client, Databases } = require("node-appwrite");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Inisialisasi Appwrite Client dengan environment variables yang benar
const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// In-memory cache untuk fallback
let messagesCache = [];

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Logging middleware yang lebih baik
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} [${duration}ms]`);
  });

  next();
});

// Function to create collection if not exists
const createCollectionIfNotExists = async () => {
  try {
    console.log("🔧 Checking if collection exists...");
    await databases.getCollection(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID
    );
    console.log("✅ Collection already exists");
  } catch (error) {
    if (error.code === 404) {
      // Collection not found
      console.log("🔨 Creating new collection...");
      await databases.createCollection(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        "Chat Messages",
        [
          'read("any")',
          'write("any")',
          'create("any")',
          'update("any")',
          'delete("any")',
        ],
        false
      );
      console.log("✅ Collection created successfully");
    } else {
      console.error("❌ Error checking collection:", error.message);
      throw error;
    }
  }
};

// Function to update collection permissions
const updateCollectionPermissions = async () => {
  try {
    console.log("🔧 Updating collection permissions...");
    await databases.updateCollection(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID,
      "Chat Messages", // name
      [
        'read("any")',
        'write("any")',
        'create("any")',
        'update("any")',
        'delete("any")',
      ], // permissions
      false // documentSecurity
    );

    console.log("✅ Collection permissions updated successfully");
  } catch (error) {
    console.error("❌ Error updating collection permissions:", error.message);
  }
};

// Helper function to save message dengan deduplication dan retry
const saveMessage = async (messageData, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Check if message already exists
      const existing = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        [`equal("messageId", "${messageData.messageId}")`]
      );

      if (existing.total > 0) {
        console.log("⚠️ Message already exists:", messageData.messageId);
        return {
          success: true,
          messageId: messageData.messageId,
          existed: true,
        };
      }

      await databases.createDocument(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        messageData.messageId,
        messageData
      );

      console.log("✅ Message saved to Appwrite:", messageData.messageId);
      return { success: true, messageId: messageData.messageId };
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      if (attempt === retries) {
        console.error("❌ Max retries reached, saving to cache");
        messagesCache.push(messageData);
        console.log(`💾 Saved to in-memory (${messagesCache.length} items)`);
        return { success: false, error: error.message };
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Endpoint untuk clear semua documents di collection
app.delete("/clear-collection", async (req, res) => {
  try {
    console.log("🧹 Clearing all documents from collection...");

    // Get all documents
    const documents = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID,
      ["limit(100)"] // Get up to 100 documents
    );

    console.log(`Found ${documents.total} documents to delete`);

    // Delete each document
    for (const doc of documents.documents) {
      await databases.deleteDocument(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        doc.$id
      );
      console.log(`Deleted document: ${doc.$id}`);
    }

    res.json({
      success: true,
      message: `Cleared ${documents.documents.length} documents from collection`,
    });
  } catch (error) {
    console.error("❌ Error clearing collection:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Debug endpoint untuk environment variables
app.get("/debug-env", (req, res) => {
  res.json({
    endpoint: process.env.APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
    collectionId: process.env.MESSAGES_COLLECTION_ID,
    // Don't expose the full API key
    apiKeyPrefix: process.env.APPWRITE_API_KEY
      ? process.env.APPWRITE_API_KEY.substring(0, 20) + "..."
      : "NOT_SET",
  });
});

// Test endpoint untuk Appwrite connectivity
app.get("/test-appwrite", async (req, res) => {
  try {
    console.log("Testing basic Appwrite connection...");

    // Test 1: Can we create a client?
    const testClient = new Client();
    testClient
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    console.log("✅ Client created successfully");

    // Test 2: Can we list databases?
    const testDatabases = new Databases(testClient);
    const dbList = await testDatabases.list();
    console.log("✅ Database list successful:", dbList.total);

    // Test 3: Can we access our specific database?
    await testDatabases.get(process.env.DATABASE_ID);
    console.log("✅ Database access successful");

    // Test 4: Can we access our collection?
    await testDatabases.listDocuments(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID,
      ["limit(1)"]
    );
    console.log("✅ Collection access successful");

    // Test 5: Create a test document
    const testDoc = {
      messageId: `test_${Date.now()}`,
      userId: "test_user",
      userName: "Test User",
      text: "Test message",
      timestamp: new Date().toISOString(),
      isFromUser: true,
      status: "sent",
      source: "test",
    };

    const result = await testDatabases.createDocument(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID,
      testDoc.messageId,
      testDoc
    );
    console.log("✅ Test document created");

    // Clean up test document
    await testDatabases.deleteDocument(
      process.env.DATABASE_ID,
      process.env.MESSAGES_COLLECTION_ID,
      testDoc.messageId
    );
    console.log("✅ Test document deleted");

    res.json({
      success: true,
      message: "All tests passed",
      databaseCount: dbList.total,
    });
  } catch (error) {
    console.error("❌ Appwrite test failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
});

// Health check endpoint yang lebih detail
app.get("/health", async (req, res) => {
  try {
    console.log("🔍 Testing Appwrite connection...");
    console.log("Endpoint:", process.env.APPWRITE_ENDPOINT);
    console.log("Project ID:", process.env.APPWRITE_PROJECT_ID);
    console.log("Database ID:", process.env.DATABASE_ID);
    console.log("Collection ID:", process.env.MESSAGES_COLLECTION_ID);

    // Step 1: Test database access
    let database;
    try {
      database = await databases.get(process.env.DATABASE_ID);
      console.log("✅ Database access successful:", database.name);
    } catch (dbError) {
      console.error("❌ Database access failed:", dbError);
      throw new Error(`Database access failed: ${dbError.message}`);
    }

    // Step 2: Test collection access
    let collection;
    try {
      collection = await databases.getCollection(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID
      );
      console.log("✅ Collection get successful:", collection.name);

      const documents = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        ["limit(1)"]
      );
      console.log(
        "✅ Collection access successful, documents:",
        documents.total
      );
    } catch (collectionError) {
      console.error("❌ Collection access failed:", collectionError);
      throw new Error(`Collection access failed: ${collectionError.message}`);
    }

    res.status(200).json({
      status: "ok",
      appwrite: "connected",
      database: database.name,
      collection: collection.name,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Health check failed:", error);
    res.status(503).json({
      status: "error",
      appwrite: "disconnected",
      error: error.message,
      database: process.env.DATABASE_ID,
      collection: process.env.MESSAGES_COLLECTION_ID,
      timestamp: new Date().toISOString(),
    });
  }
});

// Endpoint untuk load messages dari Appwrite dengan error handling yang lebih baik
app.get("/api/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("📨 Loading messages for user:", userId);

    // First, test basic collection access
    try {
      const testResponse = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        ["limit(1)"]
      );
      console.log("✅ Collection access test successful");
    } catch (testError) {
      console.error("❌ Collection access test failed:", testError);
      throw new Error(`Cannot access collection: ${testError.message}`);
    }

    // Try the actual query with error handling
    let response;
    try {
      response = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        [`equal("userId", "${userId}")`, 'orderAsc("timestamp")', "limit(100)"]
      );
    } catch (queryError) {
      console.error(
        "❌ Query failed, trying without filters:",
        queryError.message
      );

      // Fallback: get all documents and filter manually
      response = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.MESSAGES_COLLECTION_ID,
        ["limit(1000)"] // Get more documents to filter manually
      );

      // Filter documents manually
      response.documents = response.documents.filter(
        (doc) => doc.userId === userId
      );
      console.log(
        `✅ Manual filtering found ${response.documents.length} messages`
      );
    }

    const messages = response.documents.map((doc) => ({
      id: doc.messageId,
      text: doc.text,
      timestamp: doc.timestamp,
      status: doc.status || "read",
      isUser: doc.isFromUser,
      displayName: doc.displayName,
      source: doc.source,
      conversationId: doc.conversationId,
    }));

    res.json({
      success: true,
      messages,
      total: messages.length,
    });
  } catch (error) {
    console.error("❌ Error loading messages:", error);

    // Fallback ke in-memory
    const cachedMessages = messagesCache
      .filter((msg) => msg.userId === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    console.log(`📨 Returning ${cachedMessages.length} cached messages`);

    res.json({
      success: true,
      messages: cachedMessages,
      fallback: true,
      total: cachedMessages.length,
    });
  }
});

// Endpoint untuk menerima data dari Zapier Agent
app.post("/api/zapier-webhook", async (req, res) => {
  try {
    console.log("📨 Webhook dari Zapier:", JSON.stringify(req.body, null, 2));

    const {
      timestamp,
      event_type,
      source,
      message,
      user_message,
      agent_response,
      user_id,
      user_name,
      conversation_id,
    } = req.body;

    const messageId = `zapier_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Tentukan apakah ini user message atau agent response
    const isFromUser = !agent_response && (user_message || message);
    const displayName = isFromUser ? user_name || "User" : "Zapier Agent";
    const messageText = isFromUser
      ? user_message || message || ""
      : agent_response || "";

    const messageData = {
      messageId,
      userId: user_id || "",
      displayName,
      text: messageText,
      timestamp: timestamp || new Date().toISOString(),
      isFromUser,
      status: isFromUser ? "sent" : "read",
      source: source || "zapier_webhook",
      conversationId: conversation_id || "",
    };

    const result = await saveMessage(messageData);

    res.status(200).json({
      success: result.success,
      message: "Webhook received",
      messageId,
      savedToAppwrite: result.success,
    });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Endpoint untuk chat dengan Zapier Agent
app.post("/api/chat-with-agent", async (req, res) => {
  try {
    const { message, user_name, user_id } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    console.log("💬 Chat request:", { message, user_name, user_id });

    const conversationId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Save user message
    const userMessageId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const userMessageData = {
      messageId: userMessageId,
      userId: user_id,
      displayName: user_name,
      text: message,
      timestamp: new Date().toISOString(),
      isFromUser: true,
      status: "sent",
      source: "chat_widget",
      conversationId,
    };

    await saveMessage(userMessageData);

    // Send waiting response
    const waitingResponse = `👋 Halo ${user_name || "Pengguna"}! 

Pesan Anda "${message}" telah diterima dan sedang diproses oleh Zapier Agent.

⏳ *Mohon tunggu sebentar* - Agent akan memberikan response personal dalam beberapa detik...

*Conversation ID: ${conversationId}*`;

    const waitingMessageId = `waiting_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const waitingMessageData = {
      messageId: waitingMessageId,
      userId: user_id,
      displayName: "Zapier Agent",
      text: waitingResponse,
      timestamp: new Date().toISOString(),
      isFromUser: false,
      status: "read",
      source: "chat_widget",
      conversationId,
    };

    await saveMessage(waitingMessageData);

    res.json({
      success: true,
      agent_response: waitingResponse,
      conversation_id: conversationId,
      status: "waiting_for_zapier",
    });
  } catch (error) {
    console.error("❌ Error in chat endpoint:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat request",
      agent_response: "Maaf, terjadi kesalahan. Silakan coba lagi.",
    });
  }
});

// Endpoint untuk save message ke Appwrite (dari Telegram)
app.post("/api/messages", async (req, res) => {
  try {
    const { userId, userName, text, isFromUser, messageId, status, source } =
      req.body;

    if (!userId || !text) {
      return res.status(400).json({
        success: false,
        error: "userId and text are required",
      });
    }

    const messageData = {
      messageId:
        messageId ||
        `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      displayName: userName || (isFromUser ? "User" : "Admin"),
      text,
      isFromUser,
      status: status || "sent",
      timestamp: new Date().toISOString(),
      source: source || "telegram",
    };

    const result = await saveMessage(messageData);

    res.json({
      success: result.success,
      messageId: messageData.messageId,
    });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save message",
    });
  }
});

// Endpoint untuk webhook Telegram (admin reply) dengan validasi lebih baik
app.post("/api/telegram-webhook", async (req, res) => {
  try {
    console.log("📨 Telegram webhook:", JSON.stringify(req.body, null, 2));

    const update = req.body;

    if (!update.message) {
      return res.json({ success: true, message: "No message to process" });
    }

    const telegramMessage = update.message;

    // Validasi struktur pesan
    if (!telegramMessage.text || !telegramMessage.date) {
      return res.status(400).json({
        success: false,
        message: "Invalid message structure",
      });
    }

    // Parse userId dari replied message atau dari text
    let targetUserId = null;
    let messageText = telegramMessage.text;

    // Check if reply
    if (telegramMessage.reply_to_message) {
      const repliedText = telegramMessage.reply_to_message.text || "";
      const bracketMatch = repliedText.match(/^\[([^\]]+)\]/);
      if (bracketMatch) {
        const fullId = bracketMatch[1];
        targetUserId = fullId.includes("_")
          ? fullId.split("_").slice(1).join("_")
          : fullId;
      }
    }

    // Check if direct message with [nama_userId]
    if (!targetUserId && messageText) {
      const bracketMatch = messageText.match(/^\[([^\]]+)\]\s*(.*)$/);
      if (bracketMatch) {
        const fullId = bracketMatch[1];
        messageText = bracketMatch[2];
        targetUserId = fullId.includes("_")
          ? fullId.split("_").slice(1).join("_")
          : fullId;
      }
    }

    if (targetUserId && messageText.trim()) {
      const messageData = {
        messageId: `tg_${telegramMessage.message_id}_${Date.now()}`,
        userId: targetUserId,
        displayName: "Admin",
        text: messageText.trim(),
        timestamp: new Date(telegramMessage.date * 1000).toISOString(),
        isFromUser: false,
        status: "read",
        source: "telegram",
      };

      await saveMessage(messageData);

      res.json({ success: true, message: "Message saved" });
    } else {
      res.json({
        success: false,
        message: "No target user found or empty message",
      });
    }
  } catch (error) {
    console.error("❌ Error processing Telegram webhook:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Error handling yang lebih baik
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
    timestamp: new Date().toISOString(),
  });
});

// Initialize on startup
(async () => {
  try {
    await createCollectionIfNotExists();
    await updateCollectionPermissions();
  } catch (error) {
    console.error("❌ Initialization failed:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Zapier webhook: http://localhost:${PORT}/api/zapier-webhook`);
  console.log(
    `📡 Telegram webhook: http://localhost:${PORT}/api/telegram-webhook`
  );
  console.log(`📨 Messages API: http://localhost:${PORT}/api/messages/:userId`);
  console.log(
    `💬 Chat with agent: http://localhost:${PORT}/api/chat-with-agent`
  );
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Debug environment: http://localhost:${PORT}/debug-env`);
  console.log(`🧪 Appwrite test: http://localhost:${PORT}/test-appwrite`);
});
