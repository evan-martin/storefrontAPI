// This is your test secret API key.
require('dotenv').config({path: './.env'})
const stripe = require('stripe')(process.env.SK_TEST);
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json())

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: 
      req.body.payload,
    mode: 'payment',
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  });
  res.json(session.url);
});

const port = process.env.PORT || '4242'
app.listen(port, () => console.log(`listening on ${port}`));