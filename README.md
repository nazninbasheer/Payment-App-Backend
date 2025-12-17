# Payment Collection App – Backend

This is the backend service for the Payment Collection App.  
It handles customer loan details and EMI payment processing.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL

## Features
- Fetch customer loan details
- Submit EMI payments
- View payment history

## API Endpoints

### Get all customers
GET /customers

### Submit payment
POST /payments


### Get payment history
GET /payments/:account_number

## Run the Backend

Install dependencies:
npm install

Start server:
node index.js

Server runs on port 3000.

