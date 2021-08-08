const express = require("express");
const router = express.Router();
const userFormController = require("../controllers/userFormController");
const userController = require("../controllers/userController");
const {
  authenticateUser,
} = require("../middlewares/authentication");

router.post(
  "/users/application-form",
  authenticateUser,
  userFormController.submit
);
router.get(
  "/users/application-forms",
  authenticateUser,
  userFormController.getForm
);
router.delete(
  "/users/application-form/:id",
  userFormController.destroy
);
router.get(
  "/users/application-form/:id",
  userFormController.view
);
router.put(
  "/users/application-form/update/:id",
  userFormController.update
);
router.get(
  "/users/application-form/search/:name",
  userFormController.search
);

//user
router.post(
  "/users/register",
  userController.register
);
router.get(
  "/users/login",

  userController.login
);
module.exports = router;
