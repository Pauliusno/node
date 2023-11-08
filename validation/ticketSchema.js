import Joi from "joi";

const InsertTicketSchema = Joi.object({
  title: Joi.string().max(250).required(),
  ticket_price: Joi.number().min(1).max(1000).required(),
  from_location: Joi.string().max(250).required(),
  to_location: Joi.string().max(250).required(),
  to_location_photo_url: Joi.string().uri().required(),
});

export { InsertTicketSchema };
