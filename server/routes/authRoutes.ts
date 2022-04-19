import express from "express";
const router = express.Router();
import {validateForm, rateLimiter, handleLogin, attemptLogin, attemptRegister} from "../controllers/authController"

router.route("/login").get(handleLogin).post(validateForm, rateLimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);

export default router;