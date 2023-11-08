import TicketModel from "../models/ticket.js";

const CREATE_TICKET = async (req, res) => {
  try {
    const ticket = new TicketModel({
      title: req.body.title,
      ticket_price: req.body.ticket_price,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      to_location_photo_url: req.body.to_location_photo_url,
    });

    ticket.id = ticket._id;

    const response = await ticket.save();

    return res
      .status(200)
      .json({ status: "new ticket was added", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Something went wrong" });
  }
};

export { CREATE_TICKET };
