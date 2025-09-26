 

 
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
 app.use(cors({
  origin: "*", // allow all origins for testing
}));

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
