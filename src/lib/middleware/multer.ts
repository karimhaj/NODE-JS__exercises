import multer from "multer";

export const multerOptions = {};

export const initMulterMidlleware = () =>{
    return multer(multerOptions); 
}