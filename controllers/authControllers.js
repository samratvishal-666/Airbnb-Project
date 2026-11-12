const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next)=>{
    res.status(200).render('auth/login', {
        pageTitle : "Login Page",
        isLoggedIn : false,
        errors : [],
        oldInput : {email : ""},
        user : {},
    });
}

exports.getSignup = (req, res, next)=>{
    res.status(200).render('auth/signup', {
        pageTitle : "SignUp Page",
        isLoggedIn : false,
        errors : [],
        oldInput : {firstName:"", lastName:"", email:"", userType:""},
        user : {},
    });
}

exports.postSignup = [
    check("firstName")
    .trim()
    .isLength({min : 2})
    .withMessage("First Name must be minimum 2 character long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First can only contain alphabets"),

    check("lastName")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Last can only contain alphabets"),

    check("email")
    .isEmail()
    .withMessage("Please Enter a Valid Email")
    .normalizeEmail(),

    check("password")
    .isLength({min : 8})
    .withMessage("Password should contain 8 character")
    .matches(/[A-Z]/)
    .withMessage("Password must have atleast one Uppercase Letter")
    .matches(/[a-z]/)
    .withMessage("Password must have atleast one Lowercase Letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must have atleast one special character")
    .trim(),

    check("confirmPassword")
    .trim()
    .custom((value, {req})=>{
        if(value != req.body.password){
            throw new Error("Pssword  must be Same");
        }
        return true;
    }),

    check("userType")
    .notEmpty()
    .withMessage("Please Selecta User Type")
    .isIn(['guest','host'])
    .withMessage("Invalid Usertype"),

    (req, res, next)=>{
        const {firstName, lastName, email, password, userType} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render('auth/signup', {
                pageTitle : "Signup Page",
                isLoggedIn : false,
                errors : errors.array().map(err => err.msg),
                oldInput : {firstName, lastName, email, password, userType},
                user : {},
            })
        }

        bcrypt.hash(password, 12)
        .then(hashedPassword =>{
            const user = new User({firstName, lastName, email, password : hashedPassword, userType});
            return user.save();
        })
        .then(()=>{
            res.redirect('/login');
        })
        .catch(err =>{
            return res.status(422).render('auth/signup', {
            pageTitle : "Signup Page",
            isLoggedIn : false,
            errors : [err.message],
            oldInput : {firstName, lastName, email, userType},
            user : {},
            });
        });  
    }
]

exports.postLogin = async (req, res, next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).render('auth/login', {
        pageTitle : "Login Page",
        isLoggedIn : false,
        errors : ["User Does not Exists"],
        oldInput : {email},
        user : {},
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: {email},
      user: {},
    });
  }

    req.session.isLoggedIn = true;
    req.session.user = user;

    await req.session.save((err) => {
        if (err) {
            console.log("Session save error:", err);
            return next(err);
        }

        res.redirect('/');
    });
}

exports.postLogout = (req, res, next)=>{
    // req.session.isLoggedIn = false;
    // res.cookie("isLoggedIn", false);
    req.session.destroy(()=>{
        res.status(200).redirect('/login');
    })
} 