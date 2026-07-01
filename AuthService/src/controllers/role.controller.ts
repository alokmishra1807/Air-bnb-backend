import { NextFunction, Request, Response } from "express";
import { addRolePermissionService, assignRolestoUserService, createRoleService, deleteRoleByIdService,  getAllRolePermissionService,  getAllRolesService, getRoleByIdService, getRolesByNameService, getRolesPermissionService, removePermsissionFromRoleService, updateRoleService } from "../services/role.service";


export async function getRolebyIdController(req:Request,res:Response,next:NextFunction) {
    const roleResponse = await getRoleByIdService(Number(req.params.id));


      res.status(200).json({
        message:"Roles found Successfully",
        data:roleResponse,
        success:true
    })
    
}


export async function getAllRolesControllers(req:Request,res:Response,next:NextFunction) {

    const roleResponse = await getAllRolesService();

      res.status(200).json({
        message:"All roles found Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function getRoleByNameControllers(req:Request,res:Response,next:NextFunction) {


    const roleResponse = await getRolesByNameService(String(req.params.name));

      res.status(200).json({
        message:"All roles found Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function createRoleControllers(req:Request,res:Response,next:NextFunction) {
console.log(req.body)

     const roleResponse = await createRoleService(req.body);

    res.status(201).json({
        message:"Role Created Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function deleteRoleByIdControllers(req:Request,res:Response,next:NextFunction) {


    const roleResponse = await deleteRoleByIdService(Number(req.params.id));

      res.status(200).json({
        message:"role deleted Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function updateRoleControllers(req:Request,res:Response,next:NextFunction) {


    const roleResponse = await updateRoleService(Number(req.params.id),req.body);

      res.status(200).json({
        message:"role updated Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function getRolePermissionControllers(req:Request,res:Response,next:NextFunction) {


    const roleResponse = await getRolesPermissionService(Number(req.params.id));

      res.status(200).json({
        message:"role permission found Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function addRolePermissionControllers(req:Request,res:Response,next:NextFunction) {


    const roleResponse = await addRolePermissionService(req.body);

      res.status(200).json({
        message:"Role permission added Successfully",
        data:roleResponse,
        success:true
    })
    
}

export async function removerPermissionFromRoleControllers(req:Request,res:Response,next:NextFunction)
 {
    const roleResponse = await removePermsissionFromRoleService(Number(req.params.id),req.body);

      res.status(200).json({
        message:"Permission removed Successfully",
        data:roleResponse,
        success:true
    })
    
}


export async function getAllRolePermissionControllers(req:Request,res:Response) {


    const roleResponse = await getAllRolePermissionService();

      res.status(200).json({
        message:"All role permission found Successfully",
        data:roleResponse,
        success:true
    })

    
}
export async function assignRoleToUserControllers(req:Request,res:Response,next:NextFunction) {


     await assignRolestoUserService(Number(req.params.userId),Number(req.params.roleId));

      res.status(200).json({
        message:"role assigned to user Successfully",
        success:true
    })
    
}
