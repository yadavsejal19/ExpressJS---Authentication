// // app.get('/' , function (req,res) {
// //     res.render('index'); 
// // })

// // app.get('/submit' , function (req,res) {
// //     var name = req.body.name;
// //     console.log(name);
// //   res.send(`<h1>your name is </h1>` + name )
    
// // })

// // app.listen(port, function (error) {

// //     console.log("port is listening" , port)
// // } );//listening port    

// const { log } = require('console');
// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//    res.render('index');
// });

// app.get('/sub', (req, res) => {
//    const name = req.body;
//    console.log(name)
//    res.send(`Name: ${name} `);
// });

// app.listen(3000, () => {
//    console.log('Server started on port 3000');
// });


// GET request handler for the homepage
// app.get('/', (req, res) => {
//    res.render('index');
// });

// // GET request handler for the /submit route
// app.get('/submit', (req, res) => {
//    const name = req.query.name;//when we hava to take data from body using get then use req.query not body
//    const email = req.query.email;
//    res.send(`Name: ${name} <br> Email: ${email}`);
// });

// // POST request handler for the /submit route
// app.post('/submit', (req, res) => {
//    const name = req.body.name;//take data form body using post the use req.body
//    const email = req.body.email;
//    res.send(`Name: ${name} <br> Email: ${email}`);
// });

