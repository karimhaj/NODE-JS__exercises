import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/"
});

export const multerOptions = {};

export const initMulterMidlleware = () =>{
    return multer({storage, ...multerOptions}); 
}; 