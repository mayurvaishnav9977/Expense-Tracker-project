const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  }).required();

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log("Validation failed:", error.details); // <--- DEBUG
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }
  console.log(" Validation passed"); // <--- DEBUG
  next();
};



const loginvalidation = (req,res,next)=>{
    const Schema = joi.object({
 email : joi.string().email().required(),
 password: joi.string().min(4).max(100).required()
}).required();
const {error} = Schema.validate(req.body);
if(error){
    return res.status(400)
    .json({message:"Bad request",
       errors: error.details.map((err) => err.message)
      })
}
next();
}
module.exports = {
    signupValidation,
    loginvalidation
}