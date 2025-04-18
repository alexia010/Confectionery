import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token",token);

    if(!token){
        return res.status(401).json({success: false,message: "Unauthorized - no token provided"});
    }
   
    try{
        console.log("process.env.JWT_SECRET",process.env.JWT_SECRET);
        const decoded=jwt.verify(token,process.env.JWT_SECRET); //decodare

        if(!decoded)
        {
            return res.status(401).json({success: false,message: "Unauthorized - ivalid token"});
        }

    
        console.log("decoded",decoded.userId);
        req.userId=decoded.userId;
        console.log(req.userId);
        next();

    }catch(error){
        console.log("Error in verifyToken",error);
        return res.status(401).json({success: false,message: "Unauthorized"});
    }
}

export const optionalAuth = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
      // Nu există token, dar continuăm
      return next();
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.user = { _id: decoded.userId }; // Adaugă și req.user pentru a fi compatibil cu controller-ul
      next();
    } catch (error) {
      // Token invalid, dar continuăm
      console.log("Error in optionalAuth (continuing anyway)", error);
      next();
    }
};


export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
  next();
};


export default verifyToken;