const { Client, Databases } = require("node-appwrite");
require("dotenv").config();

async function diagnose() {
  try {
    console.log("🔍 APPWRITE DIAGNOSTIC TOOL\n");

    // Show configuration
    console.log("📋 Configuration:");
    console.log(`   Endpoint: ${process.env.VITE_APPWRITE_ENDPOINT}`);
    console.log(`   Project ID: ${process.env.VITE_APPWRITE_PROJECT_ID}`);
    console.log(
      `   API Key Type: ${process.env.VITE_APPWRITE_API_KEY.split("_")[0]}_***`
    );
    console.log(`   Database ID: ${process.env.ZAPIER_DATABASE_ID}`);
    console.log(`   Collection ID: ${process.env.ZAPIER_COLLECTION_ID}\n`);

    const client = new Client();
    client
      .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
      .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
      .setKey(process.env.VITE_APPWRITE_API_KEY);

    const databases = new Databases(client);

    // Test 1: Check if database exists
    console.log("🧪 Test 1: Accessing database...");
    try {
      const db = await databases.get(process.env.ZAPIER_DATABASE_ID);
      console.log("   ✅ Database accessible:", db.name);
    } catch (error) {
      console.log("   ❌ Cannot access database:", error.message);
      console.log("   Error Code:", error.code);
    }

    // Test 2: List collections
    console.log("\n🧪 Test 2: Listing collections in database...");
    try {
      const collections = await databases.listCollections(
        process.env.ZAPIER_DATABASE_ID
      );
      console.log(`   ✅ Found ${collections.collections.length} collections:`);
      collections.collections.forEach((col) => {
        console.log(`      - ${col.$id}: ${col.name}`);
      });
    } catch (error) {
      console.log("   ❌ Cannot list collections:", error.message);
    }

    // Test 3: Check if specific collection exists
    console.log("\n🧪 Test 3: Checking if zapier_data collection exists...");
    try {
      const collection = await databases.getCollection(
        process.env.ZAPIER_DATABASE_ID,
        process.env.ZAPIER_COLLECTION_ID
      );
      console.log("   ✅ Collection exists:", collection.name);
      console.log(`   📊 Document count: ${collection.documentCount}`);
    } catch (error) {
      if (error.code === 404) {
        console.log("   ⚠️  Collection does not exist (404)");
        console.log("   💡 Try creating it with create-collection.js");
      } else {
        console.log("   ❌ Error:", error.message);
        console.log("   Code:", error.code);
      }
    }

    // Test 4: Try creating a test document
    console.log("\n🧪 Test 4: Attempting to create a test document...");
    try {
      const testDoc = await databases.createDocument(
        process.env.ZAPIER_DATABASE_ID,
        process.env.ZAPIER_COLLECTION_ID,
        `test_${Date.now()}`,
        {
          documentId: `test_${Date.now()}`,
          timestamp: new Date().toISOString(),
          eventType: "test",
          source: "diagnostic",
          userMessage: "Diagnostic test",
          agentResponse: "Test successful",
          receivedAt: new Date().toISOString(),
        }
      );
      console.log("   ✅ Document created successfully!");
      console.log("   Document ID:", testDoc.$id);

      // Clean up
      try {
        await databases.deleteDocument(
          process.env.ZAPIER_DATABASE_ID,
          process.env.ZAPIER_COLLECTION_ID,
          testDoc.$id
        );
        console.log("   🧹 Test document cleaned up");
      } catch (e) {
        console.log("   ⚠️  Could not clean up test document");
      }
    } catch (error) {
      console.log("   ❌ Cannot create document:", error.message);
      console.log("   Error Code:", error.code);
      if (error.code === 401) {
        console.log(
          "\n   💡 SOLUTION: Your API key doesn't have write permissions"
        );
        console.log("   Please check these steps:");
        console.log("   1. Go to Appwrite Console → Settings → API Keys");
        console.log("   2. Click on your API key");
        console.log("   3. In Scopes section, expand 'Database'");
        console.log("   4. Check ALL database scopes");
        console.log("   5. Click 'Update'");
        console.log("   6. Restart this server");
      }
    }

    console.log("\n✨ Diagnostic complete!");
  } catch (error) {
    console.error("Fatal error:", error);
  }
}

diagnose();
