import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

connectDB();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

import userRoutes from './routes/userRoutes.mjs'
import noteRoutes from './routes/noteRoutes.mjs'
app.use("/user", userRoutes);
app.use("/notes", noteRoutes);

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});