const express = require('express');
const RatingsReviewsHelpers = require('./helpers/ratingsReviews.js');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/reviews', (req, res) => {
  console.log('Received a GET/reviews request!');
  RatingsReviewsHelpers.fetchReviews(req.query, (err, reviews) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).send(reviews);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
