'use strict';
var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const knex = require('../db/knex');
var query = require('../db/query');


/* GET home page. */


router.get('/coins', function(req, res, next) {
  var user_id = req.signedCookies.userID
  res.render('coinsheet', {
    user_id
  });
});

router.get('/member', function(req, res, next) {
  var user_id = req.signedCookies.userID
  if (user_id) {
    query.currenciesbyuser(user_id)
      .then(function(data) {
        query.getallusers()
          .then(function(datauser){
            res.render('loggedin', {
              phonenumber: datauser[0].phonenumber,
              stuff: data,
              user_id
            })
          })
      })
      .catch(function(err){
        console.log(err);
        res.redirect('/member')
      })
  } else {
    res.redirect('/users/login')
  }
})

router.post('/addcurrencies', function(req, res, next) {
  var user_id = req.signedCookies.userID;
  var currencies = req.body.currencies;
  var currenciesP = req.body.currenciesP;
  query.addcurrencies(user_id, currencies, currenciesP)
    .then(function(data) {
      res.redirect('/member')
    })
})

router.get('/twilio', function(req, res, next) {
  var user_id = req.signedCookies.userID;
  query.getallusers(user_id)
    .then(function(data) {
      var data1 = data[0];
      var phonenumber = data1.phonenumber;
      client.sendMessage({
        to: '+1'+phonenumber,
        from: '+16162025090',
        body: 'Crypt-Watcher: Bitcoin has just changes by % .4'
      }, function(err, data) {
        if (err) {
          console.log(err);
        }
      })
      res.redirect('/member')
    })

})

router.get('/converter', function(req, res, next){
  var user_id = req.signedCookies.userID;

  res.render('converter', {
    user_id
  })
})

module.exports = router;
