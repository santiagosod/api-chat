const db = require("../tools/database")
const { DataTypes } = require("sequelize")
const Users = require("./users.models")

const Conversations = db.define("conversations", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 30
        }
    },
    imageUrl: {
        type: DataTypes.STRING
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

module.exports = Conversations