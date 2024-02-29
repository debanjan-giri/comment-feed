export default function (err, req, res, next) {
  try {
    // handle error
    console.error(err.message);

    // set error status code and message
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
      data: null,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
