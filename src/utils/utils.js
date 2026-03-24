import bcrypt from "bcrypt";

export const hasedPassword = async (password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);
        return hasedPassword;

    }catch(err){
        throw err;
    }
}

export const comaprePassword = async (password ,hash)=>{

    return await bcrypt.compare(password,hash);

}