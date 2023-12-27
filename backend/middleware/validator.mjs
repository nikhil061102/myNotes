import { body, validationResult } from "express-validator";

const validateSignup = [
    body('name').trim().notEmpty().withMessage('Please enter name field'),
    body("email").trim().notEmpty().withMessage("Please enter email field")
                .trim().isEmail().withMessage("Please enter a valid email address"),
    body("password").notEmpty().withMessage("Please enter password field")
                  .isLength({ min: 7 }).withMessage("Password must be at least 7 characters long")
                  .matches(/\d/).withMessage("Password must contain at least one number")
                  .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one symbol (!@#$%^&*(),.?":{}|<>)'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            throw new Error(errors.array());
        } else{ next(); }
    },
];

const validateLogin = [
    body("email").trim().normalizeEmail().notEmpty().withMessage("Please enter email field")
                .trim().normalizeEmail().isEmail().withMessage("Please enter a valid email address"),
    body("password").notEmpty().withMessage("Please enter password field"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            throw new Error(errors.array());
        } else{ next(); }
    },
];

export default { validateSignup, validateLogin };