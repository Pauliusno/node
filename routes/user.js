import express from "express";
import {
  REGISTER_USER,
  LOGIN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  BUY_TICKET,
} from "../controllers/user.js"; // Import the REFRESH_TOKEN controller
import { REFRESH_TOKEN } from "../controllers/refreshToken.js";
// import validation from "../middlewares/validation.js";
// import { userRegistrationSchema } from "../validation/userSchema.js";

const router = express.Router();

router.post("/register", REGISTER_USER);
router.post("/login", LOGIN);
router.post("/refresh-token", REFRESH_TOKEN); // Add the new route for refreshing tokens
router.get("/", GET_ALL_USERS);
router.get("/:id", GET_USER_BY_ID);
router.post("/:id/buy", BUY_TICKET);

export default router;
// router.post("/register", validation(userRegistrationSchema), REGISTER_USER);
