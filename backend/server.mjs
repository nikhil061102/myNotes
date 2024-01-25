import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;

connectDB();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

import userRoutes from './routes/userRoutes.mjs'
import noteRoutes from './routes/noteRoutes.mjs'
app.use("/user", userRoutes);
app.use("/notes", noteRoutes);

app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
});