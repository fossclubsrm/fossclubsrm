export default defineEventHandler(async (_event) => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Server is running.",
  };
});
