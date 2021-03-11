const express = require('express');

const router = express.Router();

// Template routes
router.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'the forest hiker',
    user: 'jonas'
  });
});

router.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours'
  });
});

router.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The forest hiker Tour'
  });
});