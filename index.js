const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const BitMoji = require("./schema")
const multer = require("multer");
const path = require("path");
const { getHobbies,generateBitmoji } = require("./services/Bitmoji");
const downloadImage = require("./services/downloadImage");
require("dotenv").config();
const storage = multer.memoryStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/avatar", upload.single("avatar"), async (req, res) => {
  const id = req.body.id
    const ans = await getHobbies(
      req.file.buffer.toString("base64"),
      req.file.mimetype
    );
    const bitmoji = await generateBitmoji(ans)
    const uri = await downloadImage(bitmoji)
    await new BitMoji({id,bucketURI:bitmoji}).save()
    res.json(uri)
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
