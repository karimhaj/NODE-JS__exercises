import express from "express";
import "express-async-errors";

import { ValidationErrorMiddleware } from "./lib/middleware/validation";

import planetsRouter from "./routes/planets"; 

import { initCorsMiddleware } from "./lib/middleware/cors";


const app = express();

app.use(express.json());

app.use(initCorsMiddleware);

app.use("/planets", planetsRouter); 

app.use(ValidationErrorMiddleware);

export default app;

