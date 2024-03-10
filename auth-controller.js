const response = require("express");
var jwt = require("jsonwebtoken");

const User = require("../model/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Home Page from controller 23123");
  } catch (error) {
    console.log(error);
  }
};

// const login = async (req, res) => {
//   try {
//     res.status(200).send("Login Page from controller");
//   } catch (error) {
//     res.status(400).send({ message: "Page not found" });
//   }
// };

const login = async (req, res) => {
  try {
    const { email,password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "invalid credential" });

    }
    const isvValidpassword = await bcrypt.compare(password , existingUser.password);
    if(!isvValidpassword){
      return res.status(401).json({ message: "invalid email or password" });
    }
    res.status(200).json({message:'user login', data:existingUser,token:existingUser.generateToken()});
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Page not found" });
  }
}




const signup = async (req, res) => {
  try {
    let tekon;
    const { userName, password, email, phoneNumber, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exsist" });
    }

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      userName,
      password: hashPassword,
      email,
      phoneNumber,
      address,
    });

    // const token = await userCreated.generateToken();
    // console.log(token);

    // res.status(200).json({message: 'User created successfully', token: token});
    res
      .status(200)
      .json({
        message: "User created successfully",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    // res.status(200).send({message: 'Sign up page from controller'});
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// const user = async(req ,res) => {
//   try {
//     const userData = req.user;
//     console.log(userData);
//     return res.status(200).json({message: userData})
//     // res.status(200).json({message:'hi user'})
//   } catch (error) {
//     console.log('erro form user route')

//   }

// }

module.exports = { home, login, signup };
