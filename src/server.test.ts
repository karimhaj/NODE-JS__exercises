import supertest from 'supertest';

import { prismaMock } from "./lib/client.mock";

import app from './app';

const request = supertest(app);

describe("GET /planets", () => {
    test("valid request", async ()=>{
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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
    
        expect(response.body).toEqual(planets);
    })    
    }); 

describe("GET /planet/:id", () => {
   test("valid request", async ()=>{
       const planet ={
               id: 2,
               name: "Venus",
               description: null,
               diameter: 764,
               moons: 2,
               createdAt: "2022-09-20T10:04:46.970Z",
               updatedAt: "2022-09-20T10:04:31.011Z"
           }
   
       //@ts-ignore 
       prismaMock.planet.findUnique.mockResolvedValue(planets); 
   
       const response = await request
           .get("/planet/1")
           .expect(200)
           .expect("Content-Type", /application\/json/);
   
       expect(response.body).toEqual(planet);
   });
   
        test("Planet does not exist", async ()=>{
            prismaMock.planet.findUnique.mockResolvedValue(null);

            const response = await request
            .get("/planets/5")
            .expect(404)
            .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot GET /planets/5")
        })

        test("Invalid planet ID", async ()=>{
            const response = await request
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot GET /planets/asdf")
        })
   }); 

   

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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
    
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



  

describe("PUT/planets/:id", ()=>{

    test("valid request", async () => {
        const planet ={
            id: 3,
            name: "Mercury",
            description: "lovely planet",
            diameter: 2653,
            moons: 12,
            createdAt: "2022-09-22T08:04:35.119Z",
            updatedAt: "2022-09-22T08:04:35.119Z"
        };


   //@ts-ignore 
    prismaMock.planet.update.mockResolvedValue(planets); 
    
        const response = await request
            .put("/planets/3")
            .send({
                name: "Mercury",
                description: "lovely planet",
                diameter: 2653,
                moons: 12,
                })
            .expect(200)
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
            .put("/planets/5")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
    
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    })


    test("Planet does not exist", async ()=>{
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const response = await request
        .put("/planets/5")
        .send({ 
        name: "Mercury",
        description: "lovely planet",
        diameter: 2653,
        moons: 12,
    })
        .expect(404)
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/5")
    })

    test("Invalid planet ID", async ()=>{
        const response = await request
        .put("/planets/asdf")
        .send({ 
            name: "Mercury",
            description: "lovely planet",
            diameter: 2653,
            moons: 12,
        })
        .expect(404)
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/asdf")
    })
}); 




describe("DELETE/planet/:id", () => {
    test("valid request", async ()=>{

        const response = await request
            .delete("/planet/1")
            .expect(204)

        expect(response.text).toEqual('');
    });
    
         test("Planet does not exist", async ()=>{
             prismaMock.planet.delete.mockRejectedValue(new Error("Error"));
 
             const response = await request
             .get("/planets/5")
             .expect(404)
             .expect("Content-Type", /text\/html/)
             .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
 
             expect(response.text).toContain("Cannot DELETE /planets/5")
         })
 
         test("Invalid planet ID", async ()=>{
             const response = await request
             .delete("/planets/asdf")
             .expect(404)
             .expect("Content-Type", /text\/html/);
 
             expect(response.text).toContain("Cannot DELETE /planets/asdf")
         })
    }); 
 

describe("POST /planets/:id/photo", ()=>{
    test("valid request with PNG file upload", async () =>{
        await request
            .post("/planets/23/photo")
            .attach("photo", "text-fixtures/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
            
    })

    test("valid request with JPG file upload", async () =>{
        await request
            .post("/planets/23/photo")
            .attach("photo", "text-fixtures/file.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080"); 
            
    })

    test("invalid request with text file upload", async () =>{
        await request
            .post("/planets/23/photo")
            .attach("photo", "text-fixtures/file.txt")
            .expect(500)
            .expect("Content-Type", /text\/html/); 

            expect(response.text)
            
    })

    test("Planet does not exist", async ()=>{
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error('error'));

        const response = await request
        .post("/planets/23/photo")
        .attach("photo", "text-fixtures/file.png")
        .expect(404)
        .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot POST /planets/23/photo");
    })

    test("invalid planet ID", async () =>{
        const response = await request
        .post("/planets/asdf/photo")
        .expect(404)
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot POST /planets/asdf/photo")
    });

    test("invalid request with no file upload", async ()=>{
        const response = await request
        .post("/planets/5/photo")
        .expect(400)
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("No photo file uploaded.")
    })
})