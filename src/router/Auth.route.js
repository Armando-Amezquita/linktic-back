const { Router } = require("express");
const { ClassAuth } = require("../controllers/Auth.controller.js");
const { body, validationResult } = require("express-validator");
const routerAuth = Router();

routerAuth.post(
  "/login",
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          `The field ${errors.errors[0].param} is ${errors.errors[0].msg} `
        );
      }
      
      const { user, password } = req.body;
      const response = await ClassAuth.login(user, password);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

routerAuth.post(
  "/signup",
  body('names').not().isEmpty().trim().isAlpha(),
  body('surnames').not().isEmpty().trim().isAlpha(),
  body('user').not().isEmpty().trim().isAlpha(),
  body('password').not().isEmpty().trim().isAlpha(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req.body);

      if (!errors.isEmpty()) {
        throw new Error(
          `The field ${errors.errors[0].param} is ${errors.errors[0].msg} `
        );
      }
      const response = await ClassAuth.signUp(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400);
      next(error);
    }
  }
);

module.exports = { 
  routerAuth
};