const { db } = require('common');
const { Users } = db.models;

module.exports = (username) => Users.findOne({
    where: {
        username
    },
    raw: true,
})
