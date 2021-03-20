const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const SALT_WORK_FACTOR = 2;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Поле "Логин" обязательно для заполнения'],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await UserModel.findOne({username: value});
                if(user) return false;
            },
            message: "Такой пользователь уже существует"
        }
    },
    password: {
        type: String,
        required: [true, 'Поле "Пароль" обязательно для заполнения']
    },
    email: {
        type: String,
        required: [true, 'Поле "E-mail" обязательно для заполнения'],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await UserModel.findOne({email: value});
                if(user) return false;
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
        enum: ['user', 'admin', 'moderator', 'psychologist']
    },
    confirmed: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    online_status: {
        type: Boolean,
        default: false
    },
    hasChatRoom: {
        type: Boolean,
        default: false
    },
    telegram_id_psycho: {
        type: String,
        default: null
    },
    subscription: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    versionKey: false
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
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

UserSchema.methods.checkPass = function (password) {
    return bcrypt.compare(password, this.password);
     
};

UserSchema.methods.genToken = function () {
    this.token = nanoid();
};

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;