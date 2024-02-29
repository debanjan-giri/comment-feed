import express from "express";
import {
  createPostControllerMiddleware,
  readPostControllerMiddleware,
  deleteByIdPostControllerMiddleware,
  updateByIdPostControllerMiddleware,
  readByIdPostControllerMiddleware,
  deleteAllPostControllerMiddleware,
  postFeedControllerMiddleware,
} from "../controller/curdController.js";

import tokenCheck from "../middleware/tokenCheckMiddleware.js";

const router = express.Router();

// routes
router.post("/create", tokenCheck, createPostControllerMiddleware);
router.get("/read-all", tokenCheck, readPostControllerMiddleware);
router.get("/read/:id", tokenCheck, readByIdPostControllerMiddleware);
router.delete("/delete/:id", tokenCheck, deleteByIdPostControllerMiddleware);
router.put("/update/:id", tokenCheck, updateByIdPostControllerMiddleware);
router.delete("/delete-all", tokenCheck, deleteAllPostControllerMiddleware);

// feed
router.get("/feed", tokenCheck, postFeedControllerMiddleware);

// export
export default router;
