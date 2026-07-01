import { z } from "zod";

export const createRoleSchema = z.object({
    name : z.string().min(3),
    description: z.string().min(6),
    
   
});

export const updateRoleSchema = createRoleSchema.partial();

export const createPermissionSchema = z.object({
  
    name : z.string().min(3),
    description: z.string().min(6),
    actions:z.string().min(6),
    resources:z.string().min(10)
   
});

export const createRolePermissionSchema = z.object({
  
    userId:z.number(),
    permissionId:z.number(),
   
});