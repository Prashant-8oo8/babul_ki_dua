import express from "express";
import UserModel from "./userModel.js";

const router = express.Router();


router.get("/message", async (req, res) => {
  try {
    const count = await UserModel.countDocuments();
    if (count === 0) return res.status(404).json({ message: "No records found" });

    const randomIndex = Math.floor(Math.random() * count);
    const good_word = await UserModel.findOne().skip(randomIndex).select("goodWishes -_id");

    res.status(200).json(good_word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/message", async (req, res) => {
  try {
    const { goodWishes } = req.body;

    if (!goodWishes) {
      return res.status(400).json({ message: "goodWishes is required" });
    }


    const lastEntry = await UserModel.findOne().sort({ id: -1 }).select("id");
    const nextId = lastEntry ? lastEntry.id + 1 : 1;

    const newEntry = new UserModel({
      id: nextId,
      goodWishes:goodWishes.toUpperCase()
    });

    await newEntry.save();

    res.status(201).json({
      message: "Good wishes added",
      data: newEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
