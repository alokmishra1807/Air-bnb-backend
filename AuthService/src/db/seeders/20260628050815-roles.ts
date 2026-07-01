

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface) {
   
   queryInterface.bulkInsert('roles',[
    {
      name:'admin',
      description:'Administrator with full access'
    },
    {
      name:'user',
      description:'Regular user with limited access'
    },
    {
      name:'moderator',
      description:'Moderator with elevated privileges'
    }

   ])
  },

  async down (queryInterface :QueryInterface) {
   
     await queryInterface.bulkDelete('roles', {}, {});
     
  }
};
// -- INSERT INTO role_permissions (role_id, permission_id) 
// -- SELECT 1, id FROM permissions; -- Assuming role_id 1 is 'admin', admin has all permissions
