const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("DB connected Succesfully"))
  .catch((err) => err);

const databaseSeeder = require("./databaseseeder");
const userRouter = require("./routes/User");
app.use(express.json());
app.use("/api/v1", databaseSeeder);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server lisening to a port: ${PORT}`);
});
