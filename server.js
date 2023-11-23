const app = require("./app");
const { connectDb } = require("./config/db");

// mongo connect function
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});
