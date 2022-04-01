import express from "express";
const router = express.Router();
import validateForm from "../controllers/validateForm";
import {handleLogin, attemptLogin, attemptRegister} from "../controllers/authController";
import {rateLimiter} from "../controllers/rateLimiter"

router.route("/login").get(handleLogin).post(validateForm, rateLimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);

export default router;