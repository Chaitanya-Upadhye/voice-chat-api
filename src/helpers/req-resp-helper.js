export const responseHandler = (statusCode, bodyContent) => {
  let body =
    typeof bodyContent !== "object" ? { message: bodyContent } : bodyContent; //need to handle false-positives for functions
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    body,
  };
};
