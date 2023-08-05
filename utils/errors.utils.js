// SIGNUP ERRORS
module.exports.signUpErrors = (error) => {
  let errors = { userType: "", lastName: "", firstName: "", birthday: "", email: "", password: "" };

  if (error.message.includes("userType")) errors.userType = "Type d'utilisateur incorrect";
  if (error.message.includes("lastName")) errors.lastName = "Nom incorrect";
  if (error.message.includes("firstName")) errors.firstName = "Prénom incorrect";
  if (error.message.includes("birthday")) errors.birthday = "Date de naissance incorrecte";
  if (error.message.includes("email")) errors.email = "Email incorrect";
  if (error.message.includes("password")) errors.password = "Le mot de passe doit faire 8 caractères minimun";
  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("pseudo")) errors.email = "Ce pseudo est déjà utilisé";
  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email")) errors.email = "Cet email est déjà enregistré";
  return errors;
};

// LOGIN ERRORS
module.exports.loginErrors = (error) => {
  let errors = { email: "", password: "" };
  if (error.message.includes("email")) errors.email = "Email inconnu";
  if (error.message.includes("password")) errors.password = "Le mot de passe est invalide";
  return errors;
};

// UPLOAD ERRORS
module.exports.uploadErrors = (error) => {
  let errors = { format: "", maxSize: "" };
  if (error.message.includes("invalid file")) errors.format = "Format incompatible";
  if (error.message.includes("max size")) errors.maxSize = "Le fichier est supérieur à 500ko";
  return errors;
};
