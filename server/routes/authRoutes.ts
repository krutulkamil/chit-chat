import express from "express";
const router = express.Router();
import validateForm from "../controllers/validateForm";
import {handleLogin, attemptLogin, attemptRegister} from "../controllers/authController";

router.route("/login").get(handleLogin).post(validateForm, attemptLogin);
router.post("/signup", validateForm, attemptRegister);

export default router;