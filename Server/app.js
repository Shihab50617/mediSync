const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); 
const planRoutes = require("./routes/planRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected Successfully"))
  .catch((error) => console.error("Database connection error: ", error));

// Routes
app.use("/users", userRoutes);

app.use("/plans", planRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
