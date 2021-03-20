const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");

const UserModel = require("./models/User");
const EstablishmentModel = require("./models/Establishment");

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
        reviews: {
          user: secondSimpleUser._id,
          review: "Это отзыв для заведения Ала-Тоо.",
          appraisal: {
            interior: 4,
            food: 3,
            service: 2
          }
        },
        images: [
          {
            user: secondSimpleUser._id,
            image: "ala-too-review.jpeg"
          }
        ]
      },
        {
          title: "Ресторан Дасмия",
          description: "Описание ресторана Дасмия",
          main_image: "dasmiya.jpeg",
          user: secondSimpleUser._id,
          reviews: {
            user: firstSimpleUser._id,
            review: "Это отзыв для заведения Дасмия.",
            appraisal: {
              interior: 5,
              food: 1,
              service: 3
            }
          },
          images: [
            {
              user: firstSimpleUser._id,
              image: "dasmiya-review.jpeg"
            }
          ]
        });
  } catch (e) {
    console.log(e);
  }
  await db.close();
});
