const jwt = require('jsonwebtoken');
function generateToken(user) {
  return jwt.sign({ id: user.id,role: user.role }, process.env.KEY, { expiresIn: '10h' });
}

function verifyToken(req, res, next) {
    var token = req.headers['authorization'].replace(/^JWT\s/, '');
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }


  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    
    next();
  }
)}
function checkUserRole(role) {
    return (req, res, next) => {
        var token = req.headers['authorization']
     
  
      if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
      }
      token=token.slice(7)
   
  
      jwt.verify(token, process.env.KEY, (err, decoded) => {
       
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }
  
        if (decoded.role === role) {
        
          next();
        } else {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      });
    };
  }

module.exports = { generateToken, verifyToken ,checkUserRole};
