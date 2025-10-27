import express from "express";
import connectDB from "./db.js";
import router from "./mainRoutes.js";
import cors from "cors"; 

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.use(express.json()); 

connectDB();

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
