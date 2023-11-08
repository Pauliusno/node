import express from "express";
import { CREATE_TICKET } from "../controllers/ticket.js"; // Import the REFRESH_TOKEN controller
import authinsert from "../middlewares/authinsert.js";
import validation from "../middlewares/validation.js";
import { InsertTicketSchema } from "../validation/ticketSchema.js";

const router = express.Router();

router.post(
  "/insert",
  authinsert,
  validation(InsertTicketSchema),
  CREATE_TICKET
);

export default router;
