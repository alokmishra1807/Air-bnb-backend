import { z } from "zod";

export const createUserSchema = z.object({
    username : z.string().min(3),
    email: z.string().min(6),
    password : z.string().min(6),
   
});

export const loginUserSchema = z.object({
  
    email: z.string().min(6),
    password : z.string().min(6),
   
});