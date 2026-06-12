

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS bookings(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    hotel_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_guests INT NOT NULL,
    booking_amount INT NOT NULL,
    status ENUM('PENDING','CONFIRMED','CANCELLED') NOT NULL DEFAULT 'PENDING',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
   `);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS bookings;`);
  
  }
};




