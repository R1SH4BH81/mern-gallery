const admin = require("firebase-admin");
const path = require("path");

// Replace with your service account JSON path
const serviceAccount = require(path.join(__dirname, "./service.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-firebase-project-id.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
