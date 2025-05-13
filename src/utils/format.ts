export function formatErrorCode(code: number, msg: string) {
  const httpStatus = code.toString().substring(0, 3);
  const errorCode = code.toString().substring(3);
  const errorMessage = msg || "Unknown error";

  return {
    httpStatus,
    errorCode,
    errorMessage,
  };
}
