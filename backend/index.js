import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute  from "./routes/booksRoute.js"
import cors from "cors"
const app = express();
app.use(express.json());

// middlewere for CORS POLICY

app.use(cors())

app.use("/books", booksRoute)


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, function () {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
