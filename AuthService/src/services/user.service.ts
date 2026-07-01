import jwt from 'jsonwebtoken';
import { createUserDTO, loginUserDTO } from "../dto/user.dto";
import { createUser, getUserbyEmail, getUserbyId } from "../repositories/user.repository";
import { NotFoundError, UnauthorizedError } from "../utils/error/app.error";
import { hashpassword, matchPassword } from "../utils/password";



export async function createUserService(userData:createUserDTO) {

     const hashedPassword = await hashpassword(userData.password);

    const userToCreate = {
        ...userData,
        password: hashedPassword
    };

    const user = await createUser(userToCreate);

   

    return user;

    
}

export async function getUserByIdService(id:number) {
  const user = await getUserbyId(id);

  return user;
    
}


export async function loginUserService(
    loginData:loginUserDTO
) {
    const user = await getUserbyEmail(loginData.email);

    if(!user){
        return new NotFoundError(`user with ${loginData.email} does not exists`);
    }

    const isValid = matchPassword(loginData.password,user.password);
    if(!isValid){
        return new UnauthorizedError("Invalid email/password");
    }

   const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.SECRET_KEY as string,
  {
    expiresIn: "5d",
  }
);
return token;



    
}