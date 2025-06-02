import express from "express";
const router = express.Router();
import { contact } from "../controllers/contactcontroller.js";


router.get("/", contact);

export default router;