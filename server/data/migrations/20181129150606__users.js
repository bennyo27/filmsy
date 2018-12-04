exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    // id from auth0
    tbl.string("username").notNullable();
    tbl.string("email").notNullable();
    tbl.boolean("email_verified").notNullable();
    tbl.date("date_created").notNullable();
    tbl.date("last_login").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
