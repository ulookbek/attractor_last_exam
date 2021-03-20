const path = require('path');

const rootPath = __dirname;

let dbName;

if (process.env.NODE_ENV === 'test') {
    dbName = `${process.env.MONGO_DB_NAME_TEST}`;
} else {
    dbName = `${process.env.MONGO_DB_NAME_DEV}`;
}

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    database: `mongodb://${process.env.MONGO_DB_HOST}/${dbName}`,
    databaseOpt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
};