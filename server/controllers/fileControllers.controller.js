const File = require("../models/file.model");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

    const file = new File({
      user: req.user.id,
      filename: req.file.filename,
      fileType,
      path: req.file.path,
    });

    await file.save();

    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getFiles, uploadFile };
