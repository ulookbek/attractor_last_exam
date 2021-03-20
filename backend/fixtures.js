const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");

const UserModel = require("./models/User");
const EstablishmentModel = require("./models/Establishment");
const EstablishmentReviewModel = require("./models/EstablishmentReview");
const EstablishmentImagesModel = require("./models/EstablishmentImages");

mongoose.connect(config.database, config.databaseOpt);

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    const [
      firstSimpleUser,
      secondSimpleUser,
      admin,
    ] = await UserModel.create(
      {
        fullname: "Капарбеков Улукбек",
        password: "testpass",
        username: "kaparbekov_u",
        token: nanoid(),
        role: "user",
      },
      {
        fullname: "Тейлор Хилл",
        password: "testpass",
        username: "tailor_h",
        token: nanoid(),
        role: "user",
      },
      {
        fullname: "Администратор",
        password: "testpass",
        username: "admin",
        token: nanoid(),
        role: "admin",
      },
    );
    const
      [firstEstablishment,
        secondEstablishment,
      ] = await EstablishmentModel.create({
        title: "Ресторан Ала-Тоо",
        description: "Описание ресторана Ала-Тоо",
        main_image: "ala-too.jpeg",
        user: firstSimpleUser._id,
      },
        {
          title: "Ресторан Дасмия",
          description: "Описание ресторана Дасмия",
          main_image: "dasmiya.jpeg",
          user: secondSimpleUser._id,
        });

    const
      [firstEstablishmentReview,
        secondEstablishmentReview,
      ] = await EstablishmentReviewModel.create({
        description: "Описание ресторана Дасмия",
        establishment: secondEstablishment._id,
        user: firstSimpleUser._id,
        interior: 1,
        food: 2,
        service: 3,
      },
        {
          description: "Это отзыв для заведения Ала-Тоо.",
          establishment: firstEstablishment._id,
          user: secondSimpleUser._id,
          interior: 5,
          food: 4,
          service: 1,
        });

    const
      [firstAdditionalImageForEstablishment,
        secondAdditionalImageForEstablishment] = await EstablishmentImagesModel.create(
          {
            establishment: firstEstablishment._id,
            user: secondSimpleUser._id,
            images: "ala-too-review.jpeg",
          },
          {
            establishment: secondEstablishment._id,
            user: firstSimpleUser._id,
            images: "dasmiya-review.jpeg",
          }
        )
  } catch (e) {
    console.log(e);
  }
  await db.close();
});
