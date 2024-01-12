const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./utils/connectdb");
const apiRoutes = require("./routes/api");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
