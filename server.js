var HTTP_PORT = process.env.PORT || 8090;
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var officeData = require("./modules/officeData.js");


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
app.get("/PartTimer", (req, res) => {
  officeData
    .getPartTimers()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/employee/:num", (req, res) => {
  const num = parseInt(req.params.num);
  officeData
    .getEmployeesByNum(num)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});



app.get('/storefront', (req, res) => {
  res.sendFile(path.join(__dirname, "views", 'storefront.html'));
});

app.get("/audio", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "audio.html"));
  });
  
  app.get("/video", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "video.html"));
  });
  
  app.get("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "table.html"));
  });
  
  app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "list.html"));
  });
  
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

officeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  