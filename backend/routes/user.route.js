const router = require("express").Router();

const { getAllUser, login, signup } = require("../controllers/user");

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
