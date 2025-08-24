import jwt from "jsonwebtoken"

export const generateToken =(userId,res)=>{
    const JWT_SECRET= "hubyre6f7g127672b87";
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d",
    });


    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,         // use true only in production (HTTPS)
        sameSite: "lax",       //  allows sending from different port (e.g. 5173 -> 4000)
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      

    return token;
}