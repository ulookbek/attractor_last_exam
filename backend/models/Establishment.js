const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentsSchema = new Schema(
    {
        title: {
            type: String,
            required:
                [
                    true,
                    "Поле 'Заголовок' обязателен для заполнения",
                ]
            ,
            max: [
                250,
                "Максимальная длина заголовка 150 символов.",
            ],
        },
        description: {
            type: String,
            required: [
                true,
                "Поле 'Описание' обязателен для заполнения",
            ],
        },
        main_image: {
            type: String,
            required: [
                true,
                "Поле 'Главная фотография' обязателен для заполнения",
            ],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        created_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        reviews: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                review: String,
                appraisal: { interior: Number, food: Number, service: Number }
            }
        ],
        images: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            image: String
        }]
    }
);

const Establishments = mongoose.model("Establishment", EstablishmentsSchema);

module.exports = Establishments;
