const admin = require("../firebaseconfig");

const verifyToken = async (req, res, next) => {  
  const token = req.headers["authorization"];  
  try {
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ response: "Unauthorized Access" });
  }
};
module.exports = verifyToken;
