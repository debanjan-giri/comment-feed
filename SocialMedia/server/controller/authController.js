import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../model/authModel.js";

import {
  sendErrorResponse,
  sendSuccessResponse,
  isValidEmail,
} from "../helper/helperFunction.js";

// token generation function
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// signup
export const registerControllerMiddleware = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // Check if email is valid
    if (!isValidEmail(email) || typeof email !== "string") {
      return sendErrorResponse(res, 400, "Invalid email");
    }

    // Check if password is at least 6 characters
    if (password.trim().length < 6 || typeof password !== "string") {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 6 characters"
      );
    }

    // Check if user already exists
    const emailExists = await authModel.exists({ email });
    if (emailExists) {
      return sendErrorResponse(res, 400, "Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    // Create user
    const newUser = await authModel.create({ email, password: hashedPassword });
    if (!newUser) {
      return sendErrorResponse(res, 500, "Failed to create user");
    }

    // Generate token
    const token = generateToken(newUser._id);
    if (!token) {
      throw new Error("Failed to generate token");
    }

    // Send response
    return sendSuccessResponse(res, 201, "User created successfully", {
      user: { _id: newUser._id, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("Error in registerControllerMiddleware:", error);
    next(error);
  }
};

// login
export const loginControllerMiddleware = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // Check if email is valid
    if (!isValidEmail(email) || !email.trim().length > 0) {
      return sendErrorResponse(res, 400, "Invalid email");
    }

    // password validation
    if (password.trim().length < 1 && typeof password === "string") {
      return sendErrorResponse(res, 400, "Password is not valid");
    }

    // Check if user exists
    const user = await authModel.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }

    // Generate token
    const token = generateToken(user._id);
    if (!token) {
      throw new Error("Failed to generate token");
    }

    // Send response
    return sendSuccessResponse(res, 200, "Login successful", {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name || "guest",
        address: user.address || "india",
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginControllerMiddleware:", error);
    next(error);
  }
};

// update
export const updateControllerMiddleware = async (req, res, next) => {
  try {
    // token id
    const tokenId = req.tokenId;

    // check if token id is valid
    if (!tokenId && typeof tokenId === "string") {
      throw new Error("Invalid token");
    }

    // Extract name and password and address from request body
    const { name, password, address } = req.body;

    // Validation
    if (!password || !name || !address) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // name validation
    if (typeof name === "string" && name.trim().length < 3) {
      return sendErrorResponse(res, 400, "Name must be at least 3 characters");
    }

    // address validation
    if (typeof address === "string" && address.trim().length > 20) {
      return sendErrorResponse(res, 400, "maximum 10 characters are allowed");
    }

    // Check if password is at least 6 characters
    if (password.trim().length < 6 && typeof password === "string") {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 6 characters"
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    const updatedUser = await authModel.findByIdAndUpdate(
      tokenId,
      {
        name,
        password: hashedPassword,
        address,
      },
      { new: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return sendErrorResponse(res, 404, "User not found");
    }
    // Send response
    return sendSuccessResponse(res, 200, "User updated successfully", {
      user: {
        name: updatedUser.name,
        address: updatedUser.address,
      },
    });

    // Check if user exists
  } catch (error) {
    console.error("Error in updateControllerMiddleware:", error);
    next(error);
  }
};
