import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Client, Databases, ID } from "appwrite";
import { MessageCircle, Send, X, Check, CheckCheck } from "lucide-react";

// Inisialisasi Appwrite Client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const ChatWidgetAppwrite = () => {
  const [userId] = useState(() => {
    let id = sessionStorage.getItem("userId");
    if (!id) {
      id = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("userId", id);
    }
    return id;
  });

  const [userName, setUserName] = useState(() => {
    return sessionStorage.getItem("userName") || "";
  });

  const [showNameForm, setShowNameForm] = useState(() => {
    return !sessionStorage.getItem("userName");
  });

  const [tempName, setTempName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("admin") === "true";
  });
  const [adminReplyText, setAdminReplyText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  // Load messages from backend on component mount
  useEffect(() => {
    if (userName && userId) {
      loadMessages();
    }
  }, [userName, userId]);

  // Poll for new messages every 5 seconds when chat is open
  useEffect(() => {
    if (!isOpen || !userId) return;

    const pollInterval = setInterval(() => {
      loadMessages();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [isOpen, userId]);

  // Listen for admin replies using Appwrite Realtime
  useEffect(() => {
    if (!isOpen || isAdminMode || !userId) return;

    console.log("🔔 Setting up realtime subscription for user:", userId);

    // Subscribe to realtime updates for admin messages
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_MESSAGES_COLLECTION}.documents`,
      (response) => {
        console.log("📨 Realtime event received:", response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const newDoc = response.payload;
          console.log("📨 New document:", newDoc);

          if (newDoc.userId === userId && !newDoc.isFromUser) {
            // New message for this user (from admin or agent)
            const newMessage = {
              id: newDoc.messageId || newDoc.$id,
              text: newDoc.text,
              timestamp: new Date(newDoc.timestamp),
              status: "read",
              isUser: false,
              isAdmin:
                newDoc.displayName === "Admin" ||
                newDoc.displayName === "Zapier Agent",
              displayName: newDoc.displayName,
            };

            console.log("✅ Adding new message to UI:", newMessage);

            setMessages((prev) => {
              // Check if message already exists
              const exists = prev.some((msg) => msg.id === newMessage.id);
              if (exists) {
                console.log("⚠️ Message already exists, skipping");
                return prev;
              }

              const updated = [...prev, newMessage].sort(
                (a, b) => a.timestamp - b.timestamp
              );
              return updated;
            });
          }
        }
      }
    );

    return () => {
      console.log("🔕 Cleaning up realtime subscription");
      unsubscribe();
    };
  }, [isOpen, isAdminMode, userId]);

  const loadMessages = async () => {
    try {
      console.log("📥 Loading messages for user:", userId);

      // Fetch messages from backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"}/api/messages/${userId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to load messages: ${response.status}`);
      }

      const data = await response.json();
      console.log("📨 Loaded messages from backend:", data);

      if (data.success && Array.isArray(data.messages)) {
        const loadedMessages = data.messages.map((msg) => ({
          id: msg.id || msg.messageId,
          text: msg.text,
          timestamp: new Date(msg.timestamp),
          status: msg.status || "read",
          isUser: msg.isUser,
          isAdmin: !msg.isUser,
          displayName: msg.displayName,
        }));

        // Only update if there are changes
        setMessages((prevMessages) => {
          if (prevMessages.length !== loadedMessages.length) {
            console.log(`✅ Loaded ${loadedMessages.length} messages`);
            return loadedMessages;
          }
          return prevMessages;
        });
      }
    } catch (error) {
      console.error("❌ Error loading messages:", error);
    }
  };

  const sendToTelegram = async (text, displayName) => {
    try {
      const botToken = import.meta.env.VITE_BOT_TOKEN;
      const chatId = import.meta.env.VITE_CHAT_ID;

      if (!botToken || !chatId) {
        throw new Error("Bot token atau Chat ID tidak ditemukan");
      }

      const telegramMessage = `💬 *Pesan dari Website*\n\n👤 *Nama:* ${displayName}\n📝 *Pesan:* ${text}\n🆔 *User ID:* ${userId}`;

      console.log("📤 Sending to Telegram...");

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      console.log("✅ Sent to Telegram successfully");
      return await response.json();
    } catch (error) {
      console.error("❌ Error sending to Telegram:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const messageText = message.trim();
    setMessage("");
    setIsSending(true);

    // Create temporary message for UI
    const tempMessage = {
      id: `temp_${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      status: "sending",
      isUser: true,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      console.log("💬 Sending message to backend...");

      // Send to backend chat endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"}/api/chat-with-agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageText,
            user_name: userName,
            user_id: userId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      console.log("✅ Message sent successfully:", data);

      // Remove temp message and reload
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));

      // Wait a bit then reload messages
      setTimeout(() => loadMessages(), 1000);
    } catch (error) {
      console.error("❌ Error sending message:", error);
      // Update temp message to error status
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "error" } : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const sendAdminReply = async (targetUserId, replyText) => {
    if (!replyText.trim() || !targetUserId) return;

    try {
      console.log("📤 Sending admin reply...");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: targetUserId,
            userName: "Admin",
            text: replyText.trim(),
            isFromUser: false,
            status: "read",
            source: "admin_panel",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send admin reply");

      const data = await response.json();
      console.log("✅ Admin reply sent:", data);

      setAdminReplyText("");
      alert("Admin reply sent!");
    } catch (error) {
      console.error("❌ Error sending admin reply:", error);
      alert("Failed to send admin reply");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      const savedName = tempName.trim();
      setUserName(savedName);
      sessionStorage.setItem("userName", savedName);
      setShowNameForm(false);
    }
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNameSubmit();
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 left-6 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ${
            isConnected ? "ring-2 ring-green-400" : ""
          }`}
        >
          <MessageCircle size={24} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-linear-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold">
                  {showNameForm ? "Selamat Datang" : "Chat dengan Kami"}
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}
                  ></div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="h-[60vh] flex flex-col">
                {showNameForm ? (
                  <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-sm">
                      <div className="text-center mb-6">
                        <h4 className="text-white text-lg font-semibold mb-2">
                          Halo! 👋
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Sebelum memulai chat, boleh kenalan dulu?
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Nama Anda
                          </label>
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyPress={handleNameKeyPress}
                            placeholder="Masukkan nama Anda..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                          />
                        </div>
                        <button
                          onClick={handleNameSubmit}
                          disabled={!tempName.trim()}
                          className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg transition-all duration-300 disabled:cursor-not-allowed font-medium"
                        >
                          Mulai Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto chat-messages">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">
                          Halo {userName}! Ada yang bisa kami bantu? Kirim pesan
                          dan kami akan segera merespons.
                        </p>
                      </div>

                      <AnimatePresence>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                msg.isUser
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-700 text-gray-200"
                              }`}
                            >
                              {!msg.isUser && msg.displayName && (
                                <div className="text-xs font-semibold mb-1 text-blue-300">
                                  {msg.displayName}
                                </div>
                              )}
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.text}
                              </p>
                              <div className="flex items-center justify-end mt-1 space-x-1">
                                <span className="text-xs opacity-70">
                                  {msg.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {msg.isUser && (
                                  <div className="flex items-center">
                                    {msg.status === "sending" && (
                                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                    {msg.status === "sent" && (
                                      <Check
                                        size={12}
                                        className="text-gray-300"
                                      />
                                    )}
                                    {msg.status === "read" && (
                                      <CheckCheck
                                        size={12}
                                        className="text-green-400"
                                      />
                                    )}
                                    {msg.status === "error" && (
                                      <span className="text-red-400 text-xs">
                                        !
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="p-4 border-t border-gray-700">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ketik pesan Anda..."
                          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isSending}
                        />
                        <button
                          onClick={sendMessage}
                          disabled={isSending || !message.trim()}
                          className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white p-2 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                        >
                          {isSending ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Send size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {isAdminMode && (
                      <div className="p-4 border-t border-gray-700 bg-gray-900">
                        <div className="text-center mb-3">
                          <h4 className="text-white text-sm font-semibold">
                            🔧 Admin Panel
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Kirim balasan ke user
                          </p>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            placeholder="User ID (contoh: user_1234567890_abc123)"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={adminReplyText}
                              onChange={(e) =>
                                setAdminReplyText(e.target.value)
                              }
                              placeholder="Ketik balasan admin..."
                              className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                            />
                            <button
                              onClick={() =>
                                sendAdminReply(selectedUserId, adminReplyText)
                              }
                              disabled={
                                !adminReplyText.trim() || !selectedUserId.trim()
                              }
                              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors disabled:cursor-not-allowed text-sm"
                            >
                              Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidgetAppwrite;
