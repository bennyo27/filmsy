exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl.increments();
    table.integer("user_id").notNullable();
    table.integer("movie_id").notNullable();
    table.integer("user_review").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dopTableIfExists("reviews");
};
