import authModel from "../model/authModel.js";
import curdModel from "../model/curdModel.js";
import mongoose from "mongoose";

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../helper/helperFunction.js";

async function checkTokenUser(tokenId) {
  if (!tokenId && typeof tokenId === "string") {
    return sendErrorResponse(res, 404, "Invalid token data or data type");
  }

  // validate object id
  if (!mongoose.Types.ObjectId.isValid(tokenId)) {
    return sendErrorResponse(res, 404, "Invalid mongo id");
  }

  // token validation
  if (tokenId) {
    const user = await authModel.findById(tokenId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
  }
}

// post news feed for everyone
export const postFeedControllerMiddleware = async (req, res, next) => {
  try {
    // Check if token id is valid
    checkTokenUser(req.tokenId);

    // Get all posts
    const posts = await curdModel.find();

    // Send response
    sendSuccessResponse(
      res,
      200,
      "User data with their curd list found",
      posts
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// create post
export const createPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);

    // Extract title and description from request body
    const { title, description } = req.body;

    // validation
    if (!title || !description) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // type validation
    if (typeof title !== "string" || typeof description !== "string") {
      return sendErrorResponse(
        res,
        400,
        "Title and description must be string"
      );
    }

    // user email
    const userEmail = await authModel.findById(req.tokenId).select("email");

    // create post
    const post = await curdModel.create({
      email: userEmail.email,
      title,
      description,
    });
    // validation
    if (!post) {
      return sendErrorResponse(res, 400, "Post not created");
    }
    // update user curd id list
    const updatedUser = await authModel.findByIdAndUpdate(
      req.tokenId,
      {
        $push: { curdIdList: post._id },
      },
      { new: true }
    );

    // validation
    if (!updatedUser) {
      // delete post
      await curdModel.findByIdAndDelete(post._id);
      return sendErrorResponse(res, 400, "User not updated");
    }

    // send response
    return sendSuccessResponse(res, 201, "Post created", post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// read all
export const readPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);

    // get all posts id list from auth database
    const curdIdList = await authModel
      .findById(req.tokenId)
      .populate("curdIdList");

    //   validation
    if (!curdIdList) {
      return sendErrorResponse(res, 400, "Data and User not found");
    }

    // send response
    return sendSuccessResponse(res, 200, "Post found", curdIdList.curdIdList);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// read by id
export const readByIdPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);
    // get id from params
    const id = req.params.id;
    // validation
    if (!id) {
      return sendErrorResponse(res, 400, "post Id is required");
    }

    // validation title and description
    if (typeof id !== "string") {
      return sendErrorResponse(res, 400, "post Id must be string");
    }

    // get post by id
    const post = await curdModel.findById(id);

    // validation
    if (!post) {
      return sendErrorResponse(res, 400, "Post not found");
    }

    // send response
    return sendSuccessResponse(res, 200, "Post found", post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// update by id
export const updateByIdPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);

    // Extract title and description from request body
    const { title, description } = req.body;

    // validation
    if (!title || !description) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // type validation
    if (typeof title !== "string" || typeof description !== "string") {
      return sendErrorResponse(
        res,
        400,
        "Title and description must be string"
      );
    }

    // update post
    const post = await curdModel.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } // to return the updated document);
    );

    // validation
    if (!post) {
      return sendErrorResponse(res, 400, "Post not updated");
    }

    // send response
    return sendSuccessResponse(res, 200, "Post updated", post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// delete by id
export const deleteByIdPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);

    // get id from params
    const id = req.params.id;

    // validation
    if (!id) {
      return sendErrorResponse(res, 400, "post Id is required");
    }

    // delete post
    const post = await curdModel.findByIdAndDelete(id);

    // validation
    if (!post) {
      return sendErrorResponse(res, 400, "Post not deleted");
    }

    // update auth database
    const updatedUser = await authModel.findByIdAndUpdate(
      req.tokenId,
      {
        $pull: { curdIdList: post._id },
      },
      { new: true }
    );

    // validation
    if (!updatedUser) {
      return sendErrorResponse(res, 400, "User not updated");
    }

    // send response
    return sendSuccessResponse(res, 200, "Post deleted", post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// delete all
export const deleteAllPostControllerMiddleware = async (req, res, next) => {
  try {
    //  check if token id is valid
    checkTokenUser(req.tokenId);

    // delete all posts
    const post = await curdModel.deleteMany();

    // validation
    if (!post) {
      return sendErrorResponse(res, 400, "Post not deleted");
    }

    // update auth database
    const updatedUser = await authModel.findByIdAndUpdate(
      req.tokenId,
      {
        $set: { curdIdList: [] },
      },
      { new: true }
    );

    // validation
    if (!updatedUser) {
      return sendErrorResponse(res, 400, "User not updated");
    }

    // send response
    return sendSuccessResponse(res, 200, "Post deleted", post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
