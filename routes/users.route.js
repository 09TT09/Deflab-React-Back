const router = require("express").Router();
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

// AUTH
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// USER
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.userDelete);

module.exports = router;