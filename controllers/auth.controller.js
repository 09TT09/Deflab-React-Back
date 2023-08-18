const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { signUpErrors, loginErrors } = require("../utils/errors.utils");

const maxAge = 3 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// SIGNUP
module.exports.signUp = async (request, response) => {
  const { userType, lastName, firstName, birthday, email, password } = request.body;
  
  try {
    const user = await UserModel.create({ userType, lastName, firstName, birthday, email, password });
    // response.status(201).json({ user: user._id });
    const success = "Utilisateur enregistré. Veuillez vous connecter."
    response.status(201).send({ success });
  } catch (error) {
    console.log(error)
    const errors = signUpErrors(error);
    response.status(200).send({ errors });
  }
};

// LOGIN
module.exports.login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge, secure: true, sameSite: "None" });
    const success = "Connexion réussie."
    response.status(201).json({ user: user._id });
  } catch (error) {
    const errors = loginErrors(error);
    response.status(200).json({ errors });
  }
};

// LOGOUT
module.exports.logout = (request, response) => {
  response.cookie("jwt", "", { maxAge: 1, sameSite: "None", secure: true });
  response.redirect("/");
};
