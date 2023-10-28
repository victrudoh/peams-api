const response = (res, data, statusCode, message, status) => {
  return res.status(statusCode).json({
    statusCode: message?.status || statusCode,
    status,
    message: message?.message || message,
    data,
  });
};

exports.sendResponse = (
  res,
  data,
  statusCode = 200,
  message = "data retrieved successfully"
) => {
  return response(res, data, statusCode, message, "success");
};

exports.sendError = (
  res,
  statusCode = 500,
  message = "Something went wrong!"
) => {
  return response(res, (data = undefined), statusCode, message, "failed");
};
