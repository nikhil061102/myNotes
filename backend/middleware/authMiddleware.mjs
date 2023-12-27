import jwt from "jsonwebtoken";
import asyncHandler from"express-async-handler";
import dotenv from 'dotenv';
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err){
        res.redirect('/user');
        throw new Error("Unauthorized Access");
      } else{
        next();
      }
    });
  } else{
    res.redirect('/user');
    throw new Error("Unauthorized Access");
  }
});

export default protect;