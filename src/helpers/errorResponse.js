const errorResponse = (res, status, message) => {
  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default errorResponse;
