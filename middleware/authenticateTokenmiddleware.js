import { validateToken } from "../services/JWTcreateandvalidate.js";

export const authenticateToken = (cookie) => {
    return async (req, res, next) => {
        const tokenCookie = req.cookies[cookie];

        if (!tokenCookie) return next();
        try {
            const payload = await validateToken(tokenCookie);
            req.user = payload;
            
            const firstName = payload.fullname.split(" ")[0];
            const capitalizedfirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            req.firstName = capitalizedfirstName;

        } catch (error) {
            console.error(error.message);
            req.user = null
        }
        return next();
    }
}

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    };
  }