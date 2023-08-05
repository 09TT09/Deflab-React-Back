const router = require("express").Router();
const organizationController = require("../controllers/organizations.controller");

router.post("/create", organizationController.createOrganization);
router.get("/", organizationController.getAllOrganizations);
router.get("/limeted5", organizationController.getFiveOrganizations);
router.get("/:id", organizationController.getOrganizationById);
router.patch("/members/:id", organizationController.updateOrganizationMembers);

module.exports = router;