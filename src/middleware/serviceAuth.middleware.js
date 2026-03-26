const verifyServiceKey = (req, res, next) => {
  const apiKey = req.headers['x-service-api-key'];

  if (!apiKey || apiKey !== process.env.SERVICE_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized service request.'
    });
  }

  next();
};

module.exports = {
  verifyServiceKey
};