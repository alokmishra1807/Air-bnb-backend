

import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS permissions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`)
  },

  async down (queryInterface : QueryInterface) {
   await queryInterface.dropTable('permissions');
    
  }
};
