

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface : QueryInterface) {
   await queryInterface.sequelize.query(`

    CREATE TABLE IF NOT EXISTS idempotencykey(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idemkey VARCHAR(191) NOT NULL UNIQUE,
    booking_id INT UNIQUE,
    finalized BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX IdempotencyKey_key(idemkey),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE RESTRICT ON UPDATE CASCADE);
    `);
  },

  async down (queryInterface: QueryInterface) {
   await queryInterface.sequelize.query(`DROP TABLE IF EXISTS idempotencykey `)
  }
};
