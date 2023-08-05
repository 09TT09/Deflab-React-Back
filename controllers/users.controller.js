const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL USERS
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        return res.send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// GET USER BY ID
module.exports.getUserById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Id inconnu : " + req.params.id);
    }

    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// DELETE USER
module.exports.userDelete = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Id inconnu : " + req.params.id);
    }
  
    try {
        const user = await UserModel.deleteOne({ _id: req.params.id }).exec();
        return res.status(200).send({ message: "Suppression de l'utilisateur réussi" });
    } catch (error) {
        return res.status(500).send(error);
    }
};