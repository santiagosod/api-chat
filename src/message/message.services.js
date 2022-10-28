//! Dependencies
const messageControllers = require("./message.controller")

//? Petitions
const getAllConversationMessages = (req, res) => {
    const chatId = req.params.conversation_id

    messageControllers.getAllConversationMessages(chatId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getSpecificMessage = (req, res) => {
    const id = req.params.message_id
    const chatid = req.params.conversation_id

    messageControllers.getMessageFromConversation(chatid, id)
        .then(response => {
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const createNewMessage = (req, res) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id
    const { message } = req.body

    if (message) {
        messageControllers.createNewMessage(conversationId, { conversationId, userId, message })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: "Missing data", fields: {
                message: "string"
            }
        })
    }
}

const deleteMessage = (req, res) => {
    const chatId = req.params.conversation_id
    const id = req.params.message_id
    const userId = req.user.id

    messageControllers.deleteMessage(chatId, id, userId)
        .then(response => {
            if (response) {
                res.status(204).json(response)
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

//! Exports
module.exports = {
    getAllConversationMessages,
    createNewMessage,
    getSpecificMessage,
    deleteMessage
}