const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const SALT_WORK_FACTOR = 2;

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Поле "Фамилия и имя" обязательно для заполнения'],
    },
    password: {
        type: String,
        required: [true, 'Поле "Пароль" обязательно для заполнения']
    },
    username: {
        type: String,
        required: [true, 'Поле "E-mail" обязательно для заполнения'],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await UserModel.findOne({ username: value });
                if (user) return false;
            },
            message: "Такой пользователь уже существует"
        }
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
}, {
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (e) {
        return next(e);
    }
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;