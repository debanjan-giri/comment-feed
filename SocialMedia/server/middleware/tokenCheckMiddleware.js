import jwt from "jsonwebtoken";

export  default function tokenCheck(req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token || typeof token !== "string") {
      return res.status(403).json({
        success: false,
        message: "No token provided ",
        data: null,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({
            success: false,
            message: "Token expired",
            data: null,
          });
        }
        return res.status(403).json({
          success: false,
          message: "Invalid token",
          data: null,
        });
      }
      // set token id
      req.tokenId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
}
