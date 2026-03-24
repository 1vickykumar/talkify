
import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "6D" });
        return token;
        }catch (err) {
            throw err;
        }
}