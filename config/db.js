const mongoose = require("mongoose");

module.exports = async () => {
  const uri =
    "mongodb+srv://zahw:3665@social.0pypw.mongodb.net/za_social?retryWrites=true&w=majority";
  if (mongoose.connection.readyState) return;

  try {
    await mongoose.connect(process.env.db || uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to MONGODB");
  } catch (ex) {
    console.log("MONGO Failure", ex.message);
  }
};
