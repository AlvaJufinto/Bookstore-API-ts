import jwt, { JwtPayload } from "jsonwebtoken";

export async function signJwt(id: string): Promise<string | boolean> {
    try {
        return await jwt.sign({
            "uid": id,  
        }, process.env.SECRET_TOKEN as string, {
            expiresIn: process.env.SECRET_TIMEOUT as string
        });
    } catch (err) {
        return false;
    }
}

export async function verifyJwt(token: string) {
    try {
        const decoded: string | JwtPayload = await jwt.verify(token, process.env.SECRET_TOKEN as string);

        return {
            valid: true,
            expired: false, 
            decoded,
        }
    } catch (err: any) {
        return {
            valid: false,
            expired: err,
            decoded: null,
        }
    }
}