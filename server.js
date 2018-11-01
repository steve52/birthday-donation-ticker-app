const express = require('express');
const mongoose = require('mongoose');
cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 5000;

const promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/MovieListdb', {
  useNewUrlParser: true,
});

promise.then(() => {
  console.log('Connected to mongodb');

  const wss = new WebSocket.Server({port: 8080});

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received %s', message);
    });
    ws.send(JSON.stringify({
      message: 'something',
    }));
  });

  broadcastNewDonation = (data) => {
    console.log('data', data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  const donationSchema = new mongoose.Schema({
    name: {
      type: String,
      default: 'Anonymous',
    },
    amount: Number,
    created_date: {
      type: Date,
      default: Date.now,
    },
  });

  const Donation = mongoose.model('Donation', donationSchema);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.post('/donations', (req, res) => {
    console.log('req.body', req.body);
    const newDonation = new Donation(req.body);
    newDonation.save()
        .then((donation) => {
          console.log('donation', donation);
          Donation.find({}, (err, donations) => {
            if (err) res.send(err);
            const total = donations.reduce((acc, curr) => {
              return acc + curr.amount;
            }, 0);
            const data = {
              message_type: 'new_donation',
              donation,
              total,
            };
            broadcastNewDonation(JSON.stringify(data));
          });
          res.send(`donation saved to database: ${newDonation}`);
        })
        .catch((err) => {
          res.status(400).send('undable to save to database');
        });
  });

  app.get('/donations', (req, res) => {
    Donation.find({}, (err, donations) => {
      if (err) res.send(err);
      res.json(donations);
    });
  });

  app.delete('/donations', (req, res) => {
    Donation.remove({}, (err) => {
      if (err) res.send(err);
      res.send('deleted all donations');
    });
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));

  console.log(`Birthday donation ticker RESTful
    API server started on: ${port}`);
}, (err) => {
  console.error('Failed to connect to mongodb', err);
});
