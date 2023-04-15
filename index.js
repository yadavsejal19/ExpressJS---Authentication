const mysql = require("mysql2");
const nodemailer = require("nodemailer"); //for sending mail
const bodyPareser = require("body-parser");
const express = require("express"); //express application
const { log } = require("console");
const app = express(); // to use new express apllicaton
app.use(bodyPareser.urlencoded({ extended: true })); // use body parser middlewear for
app.use(bodyPareser.json()); //for sending json data
app.set("view engine", "ejs"); //for ejs we have to use view
//app.use(bodyPareser());//Source Express 4.16.0 - Release date: 2017-09-28 now it is deprecated  we have to use this 2 above line for bosy parser//
//database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "auc",
});
connection.connect();

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    // execute a SQL query using async/await
    async function InsertUsers() {
      try {
        const RegisterQuery = `insert into autho (name,email,password) values ('${name}','${email}','${password}');`;
        console.log(RegisterQuery);
        connection.query(RegisterQuery, function (err, Resultresult) {
          console.log(Resultresult);
        });
      } catch (error) {
        console.error(error);
      }
      res.send("<h1Register Successfully !</h1>")
    }
    InsertUsers();
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    //console.log(useremail, userpassword);
    // res.send({username, password});//using we can pass only one data object at time o therwise pass json data
    const SelectQuery = `SELECT * FROM auc.autho where email='${useremail}' and password ='${userpassword}'`;
    connection.query(SelectQuery, function (error, result) {
    //console.log(result);

      // Check if a user with the specified email and password exists
      if (result.length > 0) {
        // User exists
        res.send(`<h1>Welcome</h1>`);
      } else {
        res.send(`check username ans password `);
        // User does not exist
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/forget", (req, res) => {
  res.render("forget-password");
});
var email;
app.post("/forget", (req, res) => {
 email = req.body.email;
  //console.log(email);
  //genrate OTP
  function GenrateOTP() {
    var OTP = "";
    for (var i = 0; i < 4; i++) {
      var OTP =
        Math.floor(Math.random(1, 2, 3, 4, 5, 6, 7, 8, 9, 0) * 10) + OTP;
    }
    return OTP;
  }
  // console.log(GenrateOTP());
  //to set mail
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "codebackup122@gmail.com",
      pass: "kahboqajcjyvmgsy",
    },
  });

  let mailOptions = {
    from: "codebackup122@gmail.com",
    to: email,
    subject: "OTP Validation",
    html: `<p>Your OTP is  </p>` + GenrateOTP(),
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("email send" + info.response);
    }
  });

  res.render("forget-password");
});

app.get("/confirm", (req, res) => {
  res.render("confirm-password");
});

app.post("/confirm", (req, res) => {
    
    var otp= req.body.otp;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    //console.log (otp,password,confirmPassword ,email);

   Updatequery = `update  auc.autho set password="${password}" where email="${email}";`
   connection.query(Updatequery , function (error ,Updateresult) {
  //console.log(Updatequery,Updateresult);
    // res.send("<h1>Password Updated Successfully !!!</h1>")
   })
  res.render("confirm-password");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

