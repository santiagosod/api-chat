//! Dependencies
const Messages = require("../models/message.models")
const uuid = require("uuid")
const Users = require("../models/users.models")
const Conversations = require("../models/conversations.model")

//? Functions
const getAllConversationMessages = async conversationId => {
    const data = await Messages.findAll({
        where: {
            conversationId
        },
        attributes: {
            exclude: ["userId", "conversationId"]
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: ["userId", "createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                        }
                    }
                ]
            }
        ]
    })
    return data
}

const getMessageFromConversation = async (conversationId, id) => {
    const data = await Messages.findOne({
        where: {
            id,
            conversationId
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: ["userId", "createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ["email", "password", "phone", "createdAt", "updatedAt"]
                        }
                    }
                ]
            }
        ],
        attributes: {
            exclude: ["userId", "conversationId"]
        }
    })
    return data
}

const createNewMessage = async (conversationId, data) => {
    const response = await Messages.create({
        id: uuid.v4(),
        userId: data.userId,
        conversationId: data.conversationId,
        message: data.message,
        where: {
            conversationId
        }
    })
    return response
}

const deleteMessage = async (conversationId, id, userId) => {
    const data = await Messages.destroy({
        where: {
            id,
            conversationId,
            userId
        }
    })
    return data
}

//! Exports
module.exports = {
    getAllConversationMessages,
    createNewMessage,
    getMessageFromConversation,
    deleteMessage
}