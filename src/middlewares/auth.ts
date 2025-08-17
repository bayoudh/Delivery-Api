import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthedRequest extends Request {user?:{id:string;role:string}}
export const auth =(req:AuthedRequest,res:Response,next:NextFunction)=>{
    const header=req.headers.authorization;
    if (!header?.startsWith("Bearer"))return res.status(401).json({message:"Unauthorized"});
    const token=header.split(" ")[1];
    try{
        const payload =verifyToken(token) as any;
        req.user={id:payload.id,role:payload.role};
        next();
    }catch{
        return res.status(401).json({message:"Invalid token"});
    }
};
export const isRole =(roles:string[])=>(req:AuthedRequest,res:Response,next:NextFunction)=>{
    if(!req.user)return res.status(401).json({message:"Unauthorized"});
    if(!roles.includes(req.user.role))return res.status(403).json({message:"Forbidden"});
    next();
};