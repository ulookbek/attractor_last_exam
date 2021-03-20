const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentImagesSchema = new Schema(
    {
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
        images: {
            type: String,
            required: [
                true,
                "Картинка не загружена!",
            ],
        }
    }
);

const EstablishmentImages = mongoose.model("EstablishmentImages", EstablishmentImagesSchema);

module.exports = EstablishmentImages;
