require('dotenv').config({path: './.env'})
const stripe = require('stripe')(process.env.SK_TEST);
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json())

app.get('/create-checkout-session', (req, res) => {
  res.send('hello world')
})

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: 
    [{ price: 'price_1KSmVXKx1GFK0jKDqiNgtfXh', quantity: 1 }],
    mode: 'payment',
    success_url: 'www.google.com',
    cancel_url: 'www.google.com',
  });
  res.header("Access-Control_Allow-Origin", '*')
  res.json(session.url);
});

const port = process.env.PORT || '4242'
app.listen(port, () => console.log(`listening on ${port}`));