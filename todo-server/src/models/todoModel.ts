const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const todoDBSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: { type: String, required: true, enum: ["Completed", "Pending"] },
  updatedAt: { type: Date, required: true },
});

const Task = mongoose.model("Task", todoDBSchema);

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default Task;
