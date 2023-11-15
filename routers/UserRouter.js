const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../token');
const userRouter=require('express').Router();
const User=require('../models/User')

userRouter.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, post, password } = req.body;
  const role="USER"

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {

  
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    post,
    role,
    password: hashedPassword,
  });


    
      newUser.save().then(()=>{
        res.status(200).json({message: "user registred succesfuly"})
        
      }).catch(error=>{
        res.status(400).json({message: error.message})
        
      });

  
   

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering the user' });
  }
});







userRouter.post('/signin', async (req, res) => {
    var { email, password } = req.body;
    console.log(email)
    console.log(password)
  
    User.findOne({ email }).then(async (user)=>{
      console.log(user)
       if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(user.password)
    console.log(isPasswordValid)
  
    if (!isPasswordValid) {
     
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const token = generateToken(user)
  
    res.json({ user, token });

    }).catch((error)=>{
     res.status(500).json({ message: error.message });
    })
  
  
   
  });
  
  async function createUserIfNotExists() {
    try {
     
  
      const user = await User.findOne({ email: 'resp@gmail.com' });
  
      if (!user) {
        const hashedPassword = await bcrypt.hash('password', 10);
  
        const newUser = new User({
          firstName: 'resp',
          lastName: 'resp',
          email: 'resp@gmail.com',
          password: hashedPassword,
          phone: '123-456-7890',
          post: 'responsable',
          role: 'RESPONSABLE',
        });
  
        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
module.exports={userRouter,createUserIfNotExists}