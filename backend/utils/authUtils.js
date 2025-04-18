import jwt from 'jsonwebtoken';
import constants from '../utils/constants.js';
 
export const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const generateVerificationExpiresTime = () => {
    // return Date.now() + 24 * 60 * 60 * 1000; //24 hours
    return Date.now() + constants.FIFTEEN_MINUTES_IN_MS; // 15 min
}

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId }, process.env.JWT_SECRET, { expiresIn: constants.JWT_EXPIRES_IN });
    const options = {
        httpOnly: true,  // XSS - attack cookie cannot be accessed by client side javascript 
        secure:process.env.NODE_ENV === 'production',        // https
        sameSite: "strict",                         // csrf
        maxAge: constants.COOKIE_MAX_AGE,                  // 7 days (ms)
    };
    
    res.cookie('token', token, options);

    return token;
}

