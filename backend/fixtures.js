const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");

const UserModel = require("./models/User");
const ArticleModel = require("./models/Article");

mongoose.connect(config.database, config.databaseOpt);

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    const [
      admin,
      user,
    ] = await UserModel.create(
      {
        username: "Admin",
        password: "testpass",
        token: nanoid(),
        role: "admin",
        confirmed: true,
        email: "test.email.admin@test.te",
      },
      {
        username: "User",
        password: "testpass",
        token: nanoid(),
        role: "user",
        confirmed: true,
        email: "test.email.user@test.te",
      },
    );
  } catch (e) {
    console.log(e);
  }
  await db.close();
});
