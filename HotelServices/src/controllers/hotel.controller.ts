import { NextFunction, Request, Response } from "express";
import { createHotelService, deleteHotelbyIdService, getAllHotelService, getHotelbyIdService, updateHotelbyIdService } from "../services/hotel.service";


export async function createhotelHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse = await createHotelService(req.body);

    res.status(201).json({
        message:"Hotel Created Successfully",
        data:hotelResponse,
        success:true
    })


}

export async function gethotelHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse = await getHotelbyIdService(Number(req.params.id));

    res.status(200).json({
        message:"Hotel found Successfully",
        data:hotelResponse,
        success:true
    })


}

export async function getAllhotelHandler(req:Request,res:Response,next:NextFunction){
    // console.log(req.headers);
   
    const hotelResponse = await getAllHotelService();

    res.status(200).json({
        message:"Hotel found Successfully",
        data:hotelResponse,
        success:true
    })


}


export async function deletehotelbyHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse = await deleteHotelbyIdService(Number(req.params.id));

    res.status(200).json({
        message:"Hotel deleted Successfully",
        data:hotelResponse,
        success:true
    })


}

export async function updatehotelHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse = await updateHotelbyIdService(Number(req.params.id),req.body);

    res.status(200).json({
        message:"Hotel updated Successfully",
        data:hotelResponse,
        success:true
    })


}