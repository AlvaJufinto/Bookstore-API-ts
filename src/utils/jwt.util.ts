import jwt from "jsonwebtoken";

export async function signJwt(id: string): Promise<string | boolean> {
    try {
        return await jwt.sign({
            "uid": id,  
        }, process.env.SECRET_TOKEN as string, {
            expiresIn: process.env.SECRET_TIMEOUT as string
        });
    } catch (err) { 
        console.log(err);
        return false;
    }
}

export async function verifyJwt(token: string) {
    // token = token 
    // const decoded = await jwt.verify(token, process.env.SECRET_TOKEN as string);

    // return 
}