// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res, next) {
  var resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toGMTString() });
});
// your first API endpoint... 

app.get("/api/:time", function (req, res) {
  // const validDate = (new Date(req.params.time)).getTime();
  // const validUnix = new Date(parseInt(req.params.time));
  var type = "other";
  var unix = 0;
  if (Number(req.params.time) === parseInt(req.params.time)) {
    unix = parseInt(req.params.time)
    type = "unix";
  }
  else if((new Date(req.params.time)).getTime()) {
    type = "date"; 
    unix = (new Date(req.params.time)).getTime();
  }
  if (type === "other") {
    var ret = { error: "Invalid Date"}
  } else {
    var ret = { unix: unix, utc: new Date(unix).toGMTString()
    }
}
  res.json(ret);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
