const express = require("express");
const path = require("path");
const app = express();

// Serve index.html from this folder
app.use(express.static(path.join(__dirname)));

app.listen(3000, () => {
  console.log("Frontend running on http://localhost:3000");
});

app.get('/', (req, res) => {
  res.send('working fine');
});
