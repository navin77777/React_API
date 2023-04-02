const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react'
  });

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    // const sqlInsert =
    //   "INSERT INTO Contact (name, email, contact) VALUES ('Navin Kumar', 'navin@gmail.com', '9971161351')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("Error", error)
    //     console.log("Success", result)
        
    // })
    res.send("Hello")
  });

  app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM Contact";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  });

  app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert =
      "INSERT INTO Contact (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  });

  app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM Contact WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  });

  app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM Contact WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });


  app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE Contact SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });


app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });