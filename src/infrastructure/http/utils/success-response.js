export default function successResponse(
  res,
  data,
  message = "OK",
  status = 200
) {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
}
