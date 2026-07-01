import bcrypt from 'bcrypt'


export async function hashpassword(password:string){
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function matchPassword(password:string,userpassword : string) {
    const isMatched = await bcrypt.compare(password,userpassword);

    return isMatched;

    
}

