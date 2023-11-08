import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  money_balance: { type: Number, required: true },
  bought_tickets: { type: Array, required: true },
});

export default mongoose.model("User", userSchema);
