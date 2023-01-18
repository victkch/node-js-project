exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true },
    password: { type: "varchar(15)", notNull: true },
    class_id: { type: "integer", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("classes", {
    id: "id",
    name: { type: "varchar(10)", notNull: true },
    health: { type: "integer", notNull: true },
    damage: { type: "integer", notNull: true },
    attack_type: { type: "varchar(100)", notNull: true },
    ability: { type: "varchar(100)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
