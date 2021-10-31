require("dotenv").config();

const sdk = require("node-appwrite");

const client = new sdk.Client();

client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("YOUR_PROJECT_ID") // Your project ID
  .setKey("YOUR_API_KEY"); // Your secret API key

const db = new sdk.Database(client);

const run = async () => {
  try {
    let collection = await db.createCollection(
      "Pastes",
      [],
      [],
      [
        {
          label: "userId",
          key: "userId",
          type: "text",
          default: "Empty",
          required: true,
          array: false,
        },
        {
          label: "paste",
          key: "paste",
          type: "text",
          default: "Empty",
          required: true,
          array: false,
        },
        {
          label: "shortCode",
          key: "shortCode",
          type: "text",
          default: "Empty",
          required: true,
          array: false,
        },
      ]
    );
    console.log(collection.$id);
  } catch (e) {
    console.log(e);
  }
};

run();
