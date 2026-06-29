// I need the jwtwebtoken package so let me import it
const jwt = require('jsonwebtoken');

// Now I'm creating a middleware function called protect
const protect = (req, res, next) => {
  // I need to read the authorisation header from the incoming HTTPS request
  const authHeader = req.headers.authorization;

  // Now if it either doesn't exist, or starts with Bearer, I just create an error object
  // I'm assigning it 401 error code because it's regarding authorisation
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('No token provided, authorization denied');
    err.statusCode = 401;
    return next(err);
  }

  // If things are fine, I need to analyse the header piece-wise, cuz the second component will be the token itself
  const token = authHeader.split(' ')[1];

  // Now I need to verify the token, but this might fail too so I'll use a try-catch block
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    const error = new Error('Token is invalid or expired');
    error.statusCode = 401;
    next(error);
  }
  // Error is handled with a 401 status so that's done too
};

module.exports = { protect };