
import express from 'express';
import { assignRoleToUserControllers, createRoleControllers, deleteRoleByIdControllers, getAllRolePermissionControllers, getAllRolesControllers, getRolebyIdController, getRolePermissionControllers, updateRoleControllers } from '../../controllers/role.controller';
import { validateRequestBody } from '../../validators';
import {  createRoleSchema, updateRoleSchema } from '../../validators/role';
import { isAuth, requireAllRoles } from '../../middleware/isAuth';





const roleRouter = express.Router();

//role permission

roleRouter.get('/:id/permissions',getRolePermissionControllers);

roleRouter.get('/role-permissions',getAllRolePermissionControllers);
// roleRouter.post('/:id/permission',validateRequestBody(createRolePermissionSchema),addRolePermissionControllers)

roleRouter.post('/:userId/assign/:roleId',isAuth,requireAllRoles("admin"),assignRoleToUserControllers)

roleRouter.get('/:id',getRolebyIdController);
roleRouter.get('/',getAllRolesControllers);
roleRouter.post('/',validateRequestBody(createRoleSchema), createRoleControllers);
roleRouter.put('/:id',validateRequestBody(updateRoleSchema),updateRoleControllers);
roleRouter.delete('/:id',deleteRoleByIdControllers);






export default roleRouter;