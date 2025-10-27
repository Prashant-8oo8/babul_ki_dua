import express from "express";
import connectDB from "./db.js";
import router from "./mainRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parses JSON bodies


connectDB();

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
