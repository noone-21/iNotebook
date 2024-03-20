const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'myNameisD@nish'


// -----------------------------CREATE A USER---------------------------------------
router.post('/signup', [
  body('email', 'Enter a Valid Email!').isEmail(),
  body('name', 'Enter a Valid Name!').isLength({ min: 3 }),
  body('password', 'Password must be minimum 8 characters!').isLength({ min: 8 }),
], async (req, res) => {

  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success, error: 'Email already exists!' })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass

    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)

    success=true
    res.json({success, authtoken });
  } catch (error) {
    console.error(error.message);
    success=false
    res.status(500).send({success,error:'Internal Server Error'})
  }
})


// -----------------------------AUTHENTICATE A USER---------------------------------------
router.post('/login', [
  body('email', 'Enter a Valid Email!').isEmail(),
  body('password', 'Password cannot be Blank!').exists(),
], async (req, res) => {

  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success =false
    return res.status(400).json({success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success=false
      return res.status(400).send({success,error:'Please enter Valid Credentials!'});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false
      return res.status(400).send({success,error:'Please enter Valid Credentials!'});
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success=true
    res.json({ success,authtoken });

  } catch (error) {
    console.error(error.message);
    success=false
    res.status(500).send({success,error:'Internal Server Error'})
  }

})

// -----------------------------GET USER DETAILS---------------------------------------
router.post('/getuser', fetchuser, async (req, res) => {

  let success=false
  try {

    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    success =true
    res.json({success,user})

  } catch (error) {
    console.error(error.message);
    success=false
    res.status(500).send({success,error:'Internal Server Error'})
  }

})


module.exports = router