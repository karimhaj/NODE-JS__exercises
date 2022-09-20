import supertest from 'supertest';

import { prismaMock } from "./lib/prisma/client.mock";

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