import { Router } from "express";
import { register, login, getProfile, updateProfile } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { authenticate } from "../middleware/authentication";
import {registerSchema, loginSchema, updateProfileSchema} from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/profile", authenticate, getProfile);

router.patch("/profile", authenticate, validate(updateProfileSchema), updateProfile);

export default router;