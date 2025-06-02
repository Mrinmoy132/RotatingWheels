import jwt from "jsonwebtoken";

const secretKey = "Agartala@123"

export const createToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        fullname: user.fullname,
        role: user.role,
    }
    const token = jwt.sign(payload, secretKey);
    return token;
};

export const validateToken = async (token) => {
    const payload = jwt.verify(token, secretKey);
    return payload;
};

