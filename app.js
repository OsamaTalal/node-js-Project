const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// GET Requst
app.get("/", (req, res) => {
  // result ==> array of objects
  console.log("--------------------------------------------")
  User.find()
    .then((result) => {
      res.render("index", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });


});


// result ==> Object
app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
  .then((result) => {   res.render("user/view",{obj: result});
  }).catch((err) => {
    console.log(err);
   })

});



















app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});



app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

// POST Requst
app.post("/user/add.html", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose
  .connect(
    "mongodb+srv://osamatalal744:o123@cluster0.d2wvcro.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
