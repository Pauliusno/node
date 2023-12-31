import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TicketModel from "../models/ticket.js";
import mongoose from "mongoose";

// const BUY_TICKET = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "user does not exist" });
//     }

//     UserModel.updateOne(
//       { _id: user._id },
//       { $push: { bought_tickets: req.body.ticketId } }
//     ).exec();

//     res.status(200).json({ message: "You have bought ticket" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };
// const GET_USERS_WHO_BOUGHT_TICKETS = async (req, res) => {
//   try {
//     const users = await UserModel.find().aggregate([
//       {
//         $lookup: {
//           from: "tickets",
//           localField: "bought_tickets",
//           foreignField: "id",
//           as: "user_bought_tickets",
//         },
//       },
//     ]);

//     return res.status(200).json({ users: users });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

const GET_ALL_USERS_WITH_TICKETS = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "bought_tickets",
          foreignField: "id",
          as: "user_bought_tickets",
        },
      },
      {
        $match: {
          user_bought_tickets: { $exists: true },
          "user_bought_tickets.0": { $exists: true },
        },
      },
    ]);

    return res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const GET_USER_WITH_TICKET_BY_ID = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "bought_tickets",
          foreignField: "id",
          as: "user_bought_tickets",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]);

    return res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const BUY_TICKET = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const ticketId = req.body.ticketId;
    const ticket = await TicketModel.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }

    const ticketPrice = ticket.ticket_price;
    const userBalance = user.money_balance;

    if (userBalance < ticketPrice) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.money_balance -= ticketPrice;
    user.bought_tickets.push(ticketId);
    await user.save();

    return res.status(200).json({ message: "You have bought the ticket" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ name: 1 });
    return res.status(201).json({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const REGISTER_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      bought_tickets: [],
      money_balance: req.body.money_balance,
      password: hash,
    });

    user.id = user._id;

    const response = await user.save();

    return res
      .status(200)
      .json({ status: "User registered", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Something went wrong" });
  }
};

const LOGIN = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ message: "Bad authentication" });
  }

  bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
    if (!isPasswordMatch || err) {
      return res.status(401).json({ message: "Bad authentication" });
    }

    const accessToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refresh_token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ token: accessToken, refresh_token: refresh_token });
  });
};

export {
  REGISTER_USER,
  LOGIN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  BUY_TICKET,
  GET_USER_WITH_TICKET_BY_ID,
  GET_ALL_USERS_WITH_TICKETS,
};
