//importing modules
const express = require('express')
const AuthController = require('../Controllers/authController')
const UserController = require('../Controllers/userController')
const { auth } = require('../Middlewares/userAuth')
// const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
// router.post('/signup', userAuth.saveUser, signup)

//login route
router.post("/login", AuthController.login )

//user route
router.get("/user",auth, UserController.getUserManage )
router.post("/user",auth, UserController.insertUserManagement )

module.exports = router