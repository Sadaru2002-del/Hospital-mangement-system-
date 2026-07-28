import jwt from "jsonwebtoken";

/**
 * Generate a signed JWT token
 * @param {string} id   - MongoDB user _id
 * @param {string} role - User role (admin | doctor | receptionist | patient)
 * @returns {string}    - Signed JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
  );
};

export default generateToken;
