const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/upload.middlewares");
const fileController = require("../controllers/fileControllers.controller");

router.post("/upload", auth, upload.single("file"), fileController.uploadFile);
router.get("/", auth, fileController.getFiles);

module.exports = router;
