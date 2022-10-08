import express, { Router } from "express"; 

import prisma from '../lib/client';


import {
        validate,
        ValidationErrorMiddleware,
        planetSchema,
        PlanetData
} from "../lib/middleware/validation";

import { checkAuthorization } from "../lib/middleware/passport";

import { initMulterMidlleware } from "../lib/middleware/multer";

const upload = initMulterMidlleware();

const router = Router();

export default router; 


router.get("/", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planet.findUnique({
            where: { id: planetId }
    });

    if (!planet) {
            response.status(404);
            return next(`Cannot GET /planets/${planetId}`);
    }

    response.json(planet);
});

router.post("/", checkAuthorization, validate({ body: planetSchema }), async (request, response) => {
    const PlanetData: PlanetData = request.body;

    const planet = await prisma.planet.create({
            data: PlanetData
    });

    response.status(201).json(planet)
});


router.put("/:id(\\d+)", checkAuthorization, validate({ body: planetSchema }), async (request, response, next) => {
    const planetId = Number(request.params.id);
    const PlanetData: PlanetData = request.body;

    try {
            const planet = await prisma.planet.update({
                    where: { id: planetId },
                    data: PlanetData
            });

            response.status(200).json(planet)
    } catch (error) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`)
    }

});


router.delete("/:id(\\d+)", checkAuthorization, async (request, response, next) => {
    const planetId = Number(request.params.id);

    try {
            await prisma.planet.delete({
                    where: { id: planetId },
            });

            response.status(204).end()
    } catch (error) {
            response.status(404);
            next(`Cannot DELETE /planets/${planetId}`)
    }

});

router.post("/:id(\\d+)/photo", 
    checkAuthorization,
    upload.single("photo"),
    async (request, response, next) => {
            console.log("request.file", request.file);

            if (!request.file) {
                    response.status(400);
                    return next("no photo file uploaded.")
            }

            const planetId = Number(request.params.id);
            const photoFilename = request.file.filename;

            try {
                    await prisma.planet.update({
                            where: { id: planetId },
                            data: { photoFilename }
                    })
            } catch (error) {
                    response.status(404);
                    next(`Cannot POST /planets/${planetId}/photo`)
            }

            response.status(201).json({ photoFilename });
    }
);


router.use("/photos" , express.static("uploads"))