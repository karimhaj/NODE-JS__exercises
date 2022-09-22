import express from "express";
import "express-async-errors"; 
import prisma from './lib/prisma/client';

import {
        validate,
        ValidationErrorMiddleware,
        planetSchema,
        PlanetData
} from "./lib/validation";

const app = express(); 

app.use(express.json())

app.get("/planets", async (request, response)=>{
        const planets = await prisma.planet.findMany();
        response.json(planets);
});

app.post("/planets", validate({ body: planetSchema }), async (request, response)=>{
        const PlanetData: PlanetData = request.body;

        const planet = await prisma.planet.create({
                data: PlanetData
        });
        
        response.status(201).json(planet)
});

app.use(ValidationErrorMiddleware); 

export default app; 

