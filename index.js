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


//to add a payment

app.post('/payments', async (req, res) => {
    try {
        const { customer_id, amount, payment_date } = req.body;    
        
         const customer = await db.query(
                "SELECT id FROM customers WHERE account_number=$1",
                [account_number]
            );

            if (customer.rows.length === 0) {
                return res.status(404).json({ message: "Account not found" });
            }

            await db.query(
                 "INSERT INTO payments (customer_id, payment_amount, status) VALUES ($1,$2,$3)",
                  [customer.rows[0].id, amount, "SUCCESS"]
             );

             res.json({ message: "Payment successful" });
         }
    catch (err) {
        console.error(err.message);
    }   
});

//to view payment history by account number

app.get('/payments/:account_number', async (req, res) => {
    try {
        const { account_number } = req.params;
        const result = await db.query(
            `SELECT p.id, p.payment_amount, p.payment_date, p.status
             FROM payments p
             JOIN customers c ON p.customer_id = c.id   
                WHERE c.account_number = $1`,
            [account_number]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }   
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});