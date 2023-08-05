const OrganizationModel = require("../models/organization.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// CREATE ORGANIZATION
module.exports.createOrganization = async (req, res) => {
    const { name, representative, description } = req.body;
    
    try {
      const organization = await OrganizationModel.create({ name, representative, description });
      
      const updatedUser = await UserModel.findByIdAndUpdate(
        representative,
        { $set: { organizationOrganizerId: organization._id } },
        { new: true, upsert: false, setDefaultsOnInsert: true }
      );

      return res.status(201).json({ organization: organization._id, updatedUser });
    } catch (error) {
      return res.status(200).send(error);
    }
};

// UPDATE ORGANIZATION MEMBERS
module.exports.updateOrganizationMembers = async (req, res) => {
    if (!ObjectId.isValid(req.body.id) || !ObjectId.isValid(req.body.userId)) {
        return res.status(400).send("Id inconnu : " + req.params.id);
    }

    try {
        const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { membersId: req.body.userId } },
            { new: true, upsert: false }
        );

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { eventId: req.params.id } },
            { new: true, upsert: false }
        );

        return res.status(201).json({ updatedOrganization, updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
  

// GET ALL ORGANIZATIONS
module.exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationModel.find();
        return res.send(organizations);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// GET 5 ORGANIZATIONS
module.exports.getFiveOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationModel.find().limit(5);
        return res.send(organizations);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// GET ORGANIZATION BY ID
module.exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await OrganizationModel.findById(req.params.id);
        return res.send(organization);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// UPDATE ORGANIZATION MEMBERS
module.exports.updateOrganizationMembers = async (req, res) => {
    if (!ObjectId.isValid(req.body.id) || !ObjectId.isValid(req.body.userId)) {
        return res.status(400).send("Id inconnu : " + req.params.id);
    }

    try {
        const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { membersId: req.body.userId } },
            { new: true, upsert: false }
        );

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { eventId: req.params.id } },
            { new: true, upsert: false }
        );

        return res.status(201).json({ updatedOrganization, updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};