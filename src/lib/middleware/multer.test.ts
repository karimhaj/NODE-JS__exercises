import { generatePhotoFilename } from "./multer";

describe("", () => {
    test.each([
        ['image/png', 'png'],
        ['image/jpeg', 'jpeg']
    ])("Generates filename with correct extension when passed mimeType '%s'", 
    (mimeType, expectedFileExtension) => {
        const fileFullname = generatePhotoFilename(mimeType);
        const [, fileExtension] = fileFullname.split("."); 

        expect(fileExtension).toEqual(expectedFileExtension); 
    })
})