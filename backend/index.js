import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from './routes/booksRoutes.js';

import cors from 'cors';

const app = express();
// MiddleWare for parsing request body
app.use(express.json());
//Middleware for handling CORS policy
//Option 1: Allow all origin with default of Cors(*)
app.use(cors());

//Option 2:Allow Custom Origin
//  app.use(cors({
//   origin: 'http://localhost3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }))


app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use('/books', booksRoutes)




mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App  listening on port:${PORT}`);
    });

  })
  .catch((err) => {
    console.log(err);
  });
