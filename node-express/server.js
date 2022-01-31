const express = require("express");
const morgan = require("morgan");
const campsiteRouter = require("./routes/campsiteRouter");
const promotionRouter = require("./routes/promotionsRouter");
const partnerRouter = require("./routes/partnerRouter");

const port = process.env.port || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionRouter);
app.use("/partners", partnerRouter);

//express.static middleware function that takes an argument __dirname (refers to absolute path of current directory)
app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!!`);
});
