exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    // id from auth0
    tbl.string("username").notNullable();
    tbl.string("email").notNullable();
    tbl.boolean("email_verified");
    tbl.date("date_created");
    tbl.date("last_login");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
