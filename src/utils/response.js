module.exports = (message, data, success) => {
  return {
    message: message || "",
    data: data || null,
    success: success == null ? true : success
  };
}