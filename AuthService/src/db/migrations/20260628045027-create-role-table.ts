

import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface : QueryInterface) {
   await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`)
  },

  async down (queryInterface : QueryInterface) {
    
      await queryInterface.dropTable('roles');
    
  }
};
