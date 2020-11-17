const successRes = (res, status, message) => {
  res.status(status).json({
    success: true,
    message,
  });
};

export default successRes;
