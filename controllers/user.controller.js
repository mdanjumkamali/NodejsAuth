import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

// register
export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // find existinguser
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already register" });

    // hashpassword
    const hashPass = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    res.status(200).json({ message: "Register Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // encryptpass
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: "Incorrect password" });

    // jwt
    const token = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ token, message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout

export const Logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { $set: { tokens: [] } });

    res
      .status(200)
      .clearCookie("token", { httpOnly: true, secure: true })
      .json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name, email, password } = req.body;

  try {
    const hasPass = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(_id, {
      email,
      name,
      password: hasPass,
    });

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
