
exports.up = function(knex, Promise) {
  return knex.schema.createTable('currencies', function(table){
    table.increments();
    table.string('user_id');
    table.string('currencies')
    table.string('currenciesP')
    table.string('phonenumber')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currencies');
};
