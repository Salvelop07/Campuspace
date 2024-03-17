import connectDB from "./src/db";
import app from "./app";

const port = process.env.PORT || 5000;

connectDB()
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .catch((err) => console.log("MONGODB_CONNECTION_ERROR !!!!", err));
