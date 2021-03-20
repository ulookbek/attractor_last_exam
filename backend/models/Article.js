const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        typeModel: {
            type: String,
            required: true,
            enum: ["story", "article"],
            default: "story",
        },
        title: {
            type: Object,
            required:
                [
                    true,
                    "Поле 'Заголовок' обязателен для заполнения",
                ]
            ,
            max: [
                150,
                "Максимальная длина заголовка 150 символов.",
            ],
            setLang: true,
        },

        description: {
            type: Object,
            required: [
                true,
                "Поле 'Описание' обязателен для заполнения",
            ],
            setLang: true,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        moderator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        created_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        publish_date: {
            type: Date,
            default: null,
        },
        commentCount: {
            type: Number
        },
    },
    {strict: "throw", useNestedStrict: true}
);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
