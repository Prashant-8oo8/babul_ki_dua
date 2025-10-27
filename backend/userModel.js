import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  goodWishes: { type: String, required: true, trim: true,unique:true, maxlength: 50 }
});


const UserModel = model("User", userSchema, "achhi_bate");

export default UserModel;
