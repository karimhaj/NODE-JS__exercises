import supertest from 'supertest';

import { prismaMock } from "./lib/client.mock";

import app from './app';

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 2653,
            moons: 12,
            createdAt: "2022-09-20T10:04:11.916Z",
            updatedAt: "2022-09-20T10:03:21.528Z"
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 764,
            moons: 2,
            createdAt: "2022-09-20T10:04:46.970Z",
            updatedAt: "2022-09-20T10:04:31.011Z"
        }
    ];

    //@ts-ignore 
    prismaMock.planet.findMany.mockResolvedValue(planets); 

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planets);
})

describe("POST/planets", ()=>{

    test("valid request", async () => {
        const planet ={
            id: 3,
            name: "Mercury",
            description: null,
            diameter: 2653,
            moons: 12,
            createdAt: "2022-09-22T08:04:35.119Z",
            updatedAt: "2022-09-22T08:04:35.119Z"
        };


   //@ts-ignore 
    prismaMock.planet.create.mockResolvedValue(planets); 
    
        const response = await request
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 2653,
                moons: 12,
                })
            .expect(201)
            .expect("Content-Type", /application\/json/);
    
        expect(response.body).toEqual(planet);
    })

    test("invalid request", async () => {
        const planet =
            {
            diameter: 2653,
            moons: 12,
            };
    
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);
    
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    })

});

