const express = require("express");
const ejs = require("ejs");
const qrCode = require("qrcode");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3100;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const inputText = req.body.qrData;
  qrCode.toDataURL(inputText, (err, src) => {
    res.render('scan', {
      qrSrc: src
    });
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
