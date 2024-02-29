// helper functions
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

// helper functions
const sendSuccessResponse = (res, statusCode, message, responseData) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: responseData,
  });
};

// helper functions
const isValidEmail = (email) => {
  const myEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(myEmail);
};

export { sendErrorResponse, sendSuccessResponse, isValidEmail };
