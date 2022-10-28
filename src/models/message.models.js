const db = require("../tools/database")
const { DataTypes } = require("sequelize")
const Users = require("./users.models")
const Conversations = require("./conversations.model")

const Message = db.define("message", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
            key: "id",
            model: Users
        }
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "conversation_id",
        references: {
            key: "id",
            model: Conversations
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Message