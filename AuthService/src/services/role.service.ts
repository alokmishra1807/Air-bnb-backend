import { addRolePermissionDTO } from "../dto/permission.dto";
import { CreateRoleRequestDTO } from "../dto/role.dto";
import { createRole, deleteRole, getAllRoles, getRolebyId, getRoleByName, updateRole} from "../repositories/role.repository";
import { addRolePermission, getAllPermission, getRolePermissionbyRoleId,    removePermsissionFromRole } from "../repositories/role_permission.repository";
import { assignRoleToUser } from "../repositories/user_roles.repository";



export async function getRoleByIdService(userId:number) {
    const role = await getRolebyId(userId);
    return role;
    
}

export async function getAllRolesService() {

    const roles = await getAllRoles();
    return roles;
    
}

export async function getRolesByNameService(name:string) {
    const  role = await getRoleByName(name);
    return role;
    
}

export async function createRoleService(roleInfo:CreateRoleRequestDTO) {
    const  role = await createRole(roleInfo);
    return role;
    
}


export async function deleteRoleByIdService(userId:number) {
    const  role = await deleteRole(userId);
    return role;
    
}

export async function updateRoleService(userId:number,roleInfo:Partial<CreateRoleRequestDTO>) {
    const  role = await updateRole(userId,roleInfo);
    return role;
    
}

export async function getRolesPermissionService(id:number) {
    const  role = await getRolePermissionbyRoleId(id);
    return role;
    
}

export async function addRolePermissionService(rolePermissionInfo : addRolePermissionDTO) {
    const  role = await addRolePermission(rolePermissionInfo);
    return role;
    
}

export async function removePermsissionFromRoleService(roleId:number,permissionId:number) {
    const  role = await removePermsissionFromRole(roleId,permissionId);
    return role;
    
}

export async function getAllRolePermissionService() {
    console.log("service");
    const  rolePermission = await getAllPermission();
    return rolePermission;
    
}


export async function assignRolestoUserService(userId:number,roleId:number) {
    const  role = await assignRoleToUser(userId,roleId);
    return role;
    
}