const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentReviewSchema = new Schema(
    {
        description: {
            type: String,
            required: [
                true,
                "Поле 'Описание' обязателен для заполнения",
            ],
        },
        establishment: {
            type: Schema.Types.ObjectId,
            ref: "Establishment",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        created_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        interior: {
            type: Number,
            required: [
                true,
                "Оценка для интерьера не выбрана",
            ],
        },
        food: {
            type: Number,
            required: [
                true,
                "Оценка для food не выбрана",
            ],
        },
        service: {
            type: Number,
            required: [
                true,
                "Оценка для сервиса не выбрана",
            ],
        },
    }
);

const EstablishmentReviews = mongoose.model("EstablishmentReview", EstablishmentReviewSchema);

module.exports = EstablishmentReviews;
