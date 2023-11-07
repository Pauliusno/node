import express from "express";
import { CREATE_TICKET } from "../controllers/ticket.js"; // Import the REFRESH_TOKEN controller
// import { REFRESH_TOKEN } from "../controllers/refreshToken.js";
// import validation from "../middlewares/validation.js";
// import { userRegistrationSchema } from "../validation/userSchema.js";

const router = express.Router();

router.post("/", CREATE_TICKET);
// router.post("/:id/buy", BUY_TICKET);

export default router;
// router.post("/register", validation(userRegistrationSchema), REGISTER_USER);
