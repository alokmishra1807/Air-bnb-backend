

import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface : QueryInterface) {
   queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
)
    `)
  },

  async down (queryInterface : QueryInterface) {
   
     await queryInterface.dropTable('role_permissions');
     
  }
};
