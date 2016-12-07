const knex = require('../db/knex');

function Users() {
  return knex('users')
};

function Currencies() {
  return knex('currencies')
};





module.exports = {
  getallusers: Users,
  getallcurrencies: Currencies,
  addcurrencies: function(user_id, currencies, currenciesP) {
    return Currencies().insert({
      'user_id': user_id,
      'currencies': currencies,
      'currenciesP': currenciesP,
    })
  },
  currenciesbyuser: function(user_id) {
    return Currencies().where('user_id', user_id)
  }
};
