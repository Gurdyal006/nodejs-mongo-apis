const mongoose = require("mongoose");

exports.connectDb = async () => {
  // console.log(process.env.MONGO_URI);
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI,{
      dbName: "demoTmotions"
  })
  console.log(`DB connected on ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
