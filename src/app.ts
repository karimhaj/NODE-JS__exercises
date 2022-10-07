import express from "express";
import "express-async-errors";
import cors from "cors";

import { ValidationErrorMiddleware } from "./lib/validation";

import planetsRouter from "./routes/planets"; 

const corsOptions = {
        origin: "http://localhost:8080"
}

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use("/planets", planetsRouter); 

app.use(ValidationErrorMiddleware);

export default app;

