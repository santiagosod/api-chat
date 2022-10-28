//! Dependencies
const Conversations = require("../models/conversations.model")
const uuid = require("uuid")
const Users = require("../models/users.models")

//? Functions
const getAllConversationsByUserId = async userId => {
    const data = await Conversations.findAll({
        where: {
            userId
        },
        attributes: {
            exclude: ["userId"]
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                }
            }
        ]
    })
    return data
}

const getConversationById = async id => {
    const data = await Conversations.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ["userId"]
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                }
            }
        ]
    })
    return data
}

const createNewConversation = async data => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: data.title,
        imageUrl: data.imageUrl,
        userId: data.userId
    })
    return newConversation
}

const deleteConversation = async id => {
    const data = await Conversations.destroy({
        where: {
            id
        }
    })
    return data
}

const updateConversation = async (id, data) => {
    const result = await Conversations.update(data, {
        where: {
            id
        }
    })
    return result
}

//! Exports
module.exports = {
    getAllConversationsByUserId,
    getConversationById,
    createNewConversation,
    deleteConversation,
    updateConversation
}