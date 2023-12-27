import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";
import generateToken from "../config/generateToken.mjs";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists.");
      // switch to signin wali side
    }

    const user = await User.create({ name, email, password });
    if (user) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge : 3 * 60 * 60 * 1000});
      res.status(201).json({
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error("Unable to signup at this moment.");
    }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist.");
    // switch to signup wali side
  }
  else if (await user.matchPassword(password) == true) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge : 3 * 60 * 60 * 1000});
    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  } 
  else if (await user.matchPassword(password) == false) {
    throw new Error("Invalid Credentials");
  }
  else{
    throw new Error("Unable to login at this moment.");
  }
});

export default { registerUser, authUser };