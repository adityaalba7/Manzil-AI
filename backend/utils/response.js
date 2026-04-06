export const sendSuccess = (res, data = {}, meta = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    meta,
  });
};

export const sendError = (res, error_code, message, status = 400) => {
  return res.status(status).json({
    success: false,
    error_code,
    message,
    data: null,
  });
};
