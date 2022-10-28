const db = require("../tools/database")
const { DataTypes } = require("sequelize")
const Conversations = require("./conversations.model")
const Users = require("./users.models")

const Participants = db.define("participants", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "conversation_id",
        references: {
            key: "id",
            model: Conversations
        },
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
            key: "id",
            model: Users
        }
    }
})

module.exports = Participants