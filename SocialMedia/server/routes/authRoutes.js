import express from "express";

import {
  loginControllerMiddleware,
  registerControllerMiddleware,
  updateControllerMiddleware,
} from "../controller/authController.js";

import tokenCheck from "../middleware/tokenCheckMiddleware.js";

// express router
const router = express.Router();

// routes
router.post("/login", loginControllerMiddleware);
router.post("/register", registerControllerMiddleware);
router.put("/update", tokenCheck, updateControllerMiddleware);

// export
export default router;
