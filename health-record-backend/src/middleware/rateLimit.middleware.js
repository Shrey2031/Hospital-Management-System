// // middleware/rateLimit.middleware.js
// import rateLimit from 'express-rate-limit';

// const messageRateLimit = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 50, // 50 requests per minute
//   message: {
//     success: false,
//     message: 'Too many messages sent. Please wait a minute.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       message: 'Too many messages. Try again in 1 minute.',
//       retryAfter: 60
//     });
//   }
// });

// export default messageRateLimit;

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
  // Was left at the default keyGenerator (req.ip). Two real issues with
  // that: (1) behind any reverse proxy or platform load balancer — very
  // likely for this project's deployment — req.ip resolves to the proxy's
  // IP for every request unless app.set('trust proxy', ...) is configured
  // in app.js, which it currently isn't. Without it, this limit applies
  // globally across ALL users combined, not per-client. (2) Since this
  // almost certainly runs after UserverifyJWT, keying by the authenticated
  // user is more correct anyway — it survives IP rotation and doesn't
  // unfairly bucket multiple users behind the same NAT/office network
  // together. Falls back to req.ip only if req.user isn't present.
  //
  // IMPORTANT: for req.ip itself to be correct behind a proxy, also add
  // `app.set('trust proxy', 1)` (or the correct hop count) in app.js.
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many messages. Try again in 1 minute.',
      retryAfter: 60
    });
  }
});

export default messageRateLimit;
