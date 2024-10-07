const mongoose = require('mongoose');
const { schema } = mongoose;

const authorSchema = new Schema ({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    username: String,
    password: String,
});

authorSchema.pre('save', function (next) {
    const username = this.name.toLowerCase().replase(/\s/g, '');
    const password = '${this.name}${this.age}';
    this.username = username;
    this.password = password;
    next();
});

MediaSourceHandle.exports = authorShema;