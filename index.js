// // const express = require("express")
// // const app = express()
// // const cors = require("cors")
// //  app.use(cors())
// //  var username= "navin"
// //  var password = 123
// // app.get("/login",function(req,res){
// // if(req.query.username === username && req.query.password == password){
// //  res.send(true)
// // }
// // else{
// //     res.send(false)
// // }
// // })

// // app.listen(5000,function(){
// //     console.log("server started...")
// // })

// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json()); // for POST body parsing

// const username = "navin";
// const password = 123;

// // login route (GET - your current style)
// app.get("/login", function (req, res) {
//   if (req.query.username === username && req.query.password == password) {
//     res.send(true);
//   } else {
//     res.send(false);
//   }
// });
 
// // app.post("/login", function (req, res) {
// //   const { username: u, password: p } = req.body;
// //   if (u === username && p === password) {
// //     res.json(true);
// //   } else {
// //     res.json(false);
// //   }
// // });

// app.listen(5000, function () {
//   console.log("server started on port 5000...");
// });
//  const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const username = "navin";
// const password = "123"; // string for consistency

// app.get("/login", function (req, res) {
//   const { username: u, password: p } = req.query;

//   if (u === username && p === password) {
//     res.json(true);   // return proper JSON
//   } else {
//     res.json(false);
//   }
// });

// app.listen(5000, function () {
//   console.log("Server started on port 5000...");
// });


// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());

// const username = "navin";
// const password = "123";

// app.get("/login", function (req, res) {
//   const { username: u, password: p } = req.query;
//   if (u === username && p === password) {
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// });

// app.listen(5000, function () {
//   console.log("Server started on port 5000...");
// });


 
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// In-memory user storage
const users = [];

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ success: false, message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ success: true, message: "User registered successfully" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  const user = users.find(u => u.username === username);
  if (!user) return res.json({ success: false, message: "Invalid username or password" });

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.json({ success: false, message: "Invalid username or password" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
