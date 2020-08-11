
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
      table.increments('VIN')
      table.string('Make', 256).notNullable()
      table.string('Model', 256).notNullable()
      table.integer('Mileage').notNullable()

      table.string('Transmission', 256)
      table.string('Title Status', 256)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
