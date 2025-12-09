import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verify error:", err.message);
      return res.status(403).json({ message: "Invalid Token" });
    }
  
    req.user = decoded;
    next();
  });
};
