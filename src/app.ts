import express from "express";
import "express-async-errors";

import { ValidationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport"; 

import planetsRouter from "./routes/planets"; 



const app = express();

app.use(initSessionMiddleware()); 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware);

app.use("/planets", planetsRouter); 

app.use(ValidationErrorMiddleware);

export default app;

