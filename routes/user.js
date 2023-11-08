import express from "express";
import {
  REGISTER_USER,
  LOGIN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  BUY_TICKET,
  GET_USER_WITH_TICKET_BY_ID,
  GET_ALL_USERS_WITH_TICKETS,
} from "../controllers/user.js";
import { REFRESH_TOKEN } from "../controllers/refreshToken.js";
import auth from "../middlewares/auth.js";
import validation from "../middlewares/validation.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../validation/userSchema.js";
const router = express.Router();

router.post("/register", validation(userRegistrationSchema), REGISTER_USER);
router.post("/login", validation(userLoginSchema), LOGIN);
router.post("/refresh-token", REFRESH_TOKEN);
router.get("/", auth, GET_ALL_USERS);
router.get("/id/:id", auth, GET_USER_BY_ID);
router.post("/:id/buy", auth, BUY_TICKET);
router.get("/with-ticket/:id", auth, GET_USER_WITH_TICKET_BY_ID);
router.get("/with-ticket", auth, GET_ALL_USERS_WITH_TICKETS);

export default router;
