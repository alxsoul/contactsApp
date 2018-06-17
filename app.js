const express = require("express");

const app = express();

const controller = require("./controllers/controller.js");

app.set("view engine", "ejs");

app.use(express.static("./public"));

controller(app);

app.listen("4040", ()=>{
  console.log("Now llistening to port 4040");
});
