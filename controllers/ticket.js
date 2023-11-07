import TicketModel from "../models/ticket.js";
import UserModel from "../models/user.js";

import mongoose from "mongoose";

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

// const BUY_TICKET = async (req, res) => {
//   try {
//     const ticket = await TicketModel.findById(req.params.id);

//     if (!ticket) {
//       return res.status(404).json({ message: "ticket does not exist" });
//     }

//     UserModel.updateOne(
//       { _id: user._id },
//       { $push: { bought_tickets: req.body.ticketId } }
//     ).exec();

//     res.status(200).json({ message: "You have bought event" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

// const BUY_TICKET = async (req, res) => {
//   try {
//     const ticket = await TicketModel.findById(req.params.id);

//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket does not exist" });
//     }

//     const user = await UserModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Push the ticketId into the user's bought_tickets array
//     user.bought_tickets.push(req.body.Id);

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({ message: "You have bought the event" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export { CREATE_TICKET };
