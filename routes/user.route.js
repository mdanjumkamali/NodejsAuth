import { Router } from "express";
import {
  Login,
  Register,
  updateUser,
  Logout,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/update").patch(authMiddleware, updateUser);
router.route("/logout").post(authMiddleware, Logout);

export default router;
