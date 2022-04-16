import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { mainRouter } from "./routes/mainRouter";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
}

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(mainRouter);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
