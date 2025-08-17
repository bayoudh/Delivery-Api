import { NextFunction, Request, Response } from "express";

export const notFound=(req:Request,res:Response)=>{
    res.status(404).json({message:`Route not found:${req.method} ${req.originalUrl}`});
};
export const errorHandler =(err:any,req:Request,res:Response,_next:NextFunction)=>{
    console.error(err);
    const status=err.status||500;
    res.status(status).json({message:err.message || 'Server Error',stack: process.env.NODE_ENV === "production" ? undefined : err.stack });
};