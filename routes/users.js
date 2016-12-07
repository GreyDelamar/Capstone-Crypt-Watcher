'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() {
  return knex('users')
};

// authorizedUser route
function authorizedUser(req, res, next) {
  let user_id = req.signedCookies.userID;
  if (user_id) {
    next();
  } else {
    req.flash('error', 'You are not authorized.');
    res.redirect(401, '/');
  }
}

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});


module.exports = router;
