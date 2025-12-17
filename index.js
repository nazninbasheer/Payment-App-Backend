require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

//connecion check 
app.get("/", (req, res) => {
  res.json({ message: "connection success" });
});


//to get all customers 

app.get('/customers',  async (req, res) => {
    try {
        const result  = await db.query("SELECT * FROM customers");   
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }   
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});