const router = require("express").Router();
const userController = require("../app/controllers/userController");
const carController = require("../app/controllers/carController");
const handleGoogleLoginOrRegister = require("../app/controllers/handleGoogleLoginOrRegister")

// Define routes here:

// GET: /api/v1/cars
//Postman GET: http://localhost:8000/api/v1/cars?filter={"availableAt": "2022-03-25T15:49:05.563Z"}&offset=0&limit=25
router.get("/api/v1/cars", carController.getAll);
// POST: /api/v1/register
router.post("/api/v1/register", userController.register);
// POST: /api/v1/login
router.post("/api/v1/auth/login", userController.login);
// POST: /api/v1/auth/google
router.post("/api/v1/auth/google",handleGoogleLoginOrRegister.handleGoogleLoginOrRegister);
module.exports = router;
