import express, { Request, Response } from "express";
const router = express.Router();
import validateForm from "../controllers/validateForm";

router.post("/login", async (req: Request, res: Response) => {
    validateForm(req, res);
});

router.post("/signup", async (req: Request, res: Response) => {
    validateForm(req, res);
});

export default router;