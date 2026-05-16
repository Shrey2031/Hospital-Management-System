// middleware/rateLimit.middleware.js
import rateLimit from 'express-rate-limit';

const messageRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // 50 requests per minute
  message: {
    success: false,
    message: 'Too many messages sent. Please wait a minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many messages. Try again in 1 minute.',
      retryAfter: 60
    });
  }
});

export default messageRateLimit;
