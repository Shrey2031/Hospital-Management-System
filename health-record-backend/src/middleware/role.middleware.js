// import { ApiError } from "../utils/apiError.js";

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new ApiError(403, "role is not authorized to access this resource");
//     }
//     next();
//   };
// };

import { ApiError } from "../utils/apiError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Was missing this check — if authorizeRoles is ever mounted without
    // UserverifyJWT running first (or in the unlikely case req.user is
    // otherwise missing), req.user.role would throw a raw TypeError.
    // Express 4 catches synchronous throws automatically so it wouldn't
    // crash the server, but it produced a confusing 500 instead of a
    // clear, intentional 401.
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not authorized to access this resource");
    }
    next();
  };
};