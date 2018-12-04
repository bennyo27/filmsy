exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl.increments().unique();
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users");
    tbl.integer("movie_id").notNullable();
    tbl.integer("user_review").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dopTableIfExists("reviews");
};
