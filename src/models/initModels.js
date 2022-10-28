const Conversations = require("./conversations.model")
const Message = require("./message.models")
const Participants = require("./participants.model")
const Users = require("./users.models")

const initModels = () => {
    Message.belongsTo(Users)
    Users.hasMany(Message)

    Message.belongsTo(Conversations)
    Conversations.hasMany(Message)

    Conversations.belongsTo(Users)
    Users.hasMany(Conversations)

    Participants.belongsTo(Users)
    Users.hasMany(Participants)

    Participants.belongsTo(Conversations)
    Conversations.hasMany(Participants)
}

module.exports = initModels