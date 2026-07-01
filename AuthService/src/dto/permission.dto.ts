
export type CreatePermissionRequestDTO = {
    Name:string,
	Description :string 
    resource: string, 
    action: string
    
}


export type addRolePermissionDTO ={
    roleId:number,
    PermissionId:number
}