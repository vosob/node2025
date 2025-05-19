import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connection success"))
  .catch((error) => {
    console.log("Database error", error);
    process.exit(1);
  });
