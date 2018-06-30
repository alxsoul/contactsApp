const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mysql = require("mysql");

const sqlCon = mysql.createConnection({
  host      : "localhost",
  user      : "root",
  password  : "",
  database  : "contact_list"
});

sqlCon.connect(()=>{
  console.log("Connected to database!!");
});




module.exports = (app)=>{

  app.get("/YourContacts", (req, res)=>{
    let sql = "SELECT * FROM contacts";
    sqlCon.query(sql, (err, data)=>{
      if (err) console.log("Error in fetching data:\n " + err);
      res.render("contactList", {contacts: data});
    });
  });

  app.get("/addNewContact", (req, res)=>{
    res.render("addNewContact");
  });

  app.post("/addNewContact" ,urlencodedParser, (req, res)=>{
    let contact = {name: req.body.name, number: req.body.number, description: req.body.description};
    let sql = "INSERT INTO contacts SET ?";
    sqlCon.query(sql, contact, (err, res)=>{
      if (err) console.log("Error inserting: \n" + err);
      console.log("CONTACT_INSERTED!!")
    });
    res.redirect("http://localhost:4040/YourContacts");
  });

  app.get("/YourContacts/delete/:id", (req, res)=>{
    let sql = `DELETE FROM contacts WHERE id = ${req.params.id}`;
    sqlCon.query(sql, (err)=>{
      if (err) console.log(err);
      console.log("DELETED!!")
      res.redirect("http://localhost:4040/YourContacts");
    })
  });

  app.get("/Edit/:id", (req, res)=>{
    let sql =`SELECT * FROM contacts WHERE id = ${req.params.id}`;
    sqlCon.query(sql, (err, data)=>{
      if(err) console.log("Error in editting: \n" + err);
      res.render("EditYourContact", {contact: data});
      console.log("SUCCESS_GETTING_CONT!!");
    })
});

app.post("/Edit/:id", urlencodedParser, (req, res)=>{
  let newCont = {name:req.body.name, number:req.body.number, description:req.body.description};
  let sql = `UPDATE contacts SET ? WHERE id = ${req.params.id}`;
  sqlCon.query(sql, newCont, (err, data)=>{
    if (err) console.log("Error in editing: \n" + err);
    console.log("SUCCESS_EDITING!!");
  });
  res.redirect("http://localhost:4040/YourContacts");
})

}
