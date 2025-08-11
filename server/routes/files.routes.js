const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const fileController = require("../controllers/fileController");

router.post("/upload", auth, upload.single("file"), fileController.uploadFile);
router.get("/", auth, fileController.getFiles);

module.exports = router;
