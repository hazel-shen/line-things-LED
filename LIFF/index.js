var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 1000000
  })
);
server.listen(process.env.PORT || 3000);
console.log('App now running on port', 3000)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/page/index.html");
});

app.get("/safe", (req, res) => {
  res.status(200).sendFile(__dirname + "/page/Safe.html");
});

app.get("/trafficlight", (req, res) => {
  res.status(200).sendFile(__dirname + "/page/TrafficLight.html");
});