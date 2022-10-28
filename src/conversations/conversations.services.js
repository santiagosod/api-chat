//! Dependencies
const conversationsConrtollers = require("./conversations.controllers")

//? Petitions
const getAllConversationsByUserId = (req, res) => {
    const userId = req.user.id

    conversationsConrtollers.getAllConversationsByUserId(userId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getConversationById = (req, res) => {
    const id = req.params.conversation_id

    conversationsConrtollers.getConversationById(id)
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

const createNewConversation = (req, res) => {
    const { title, imageUrl } = req.body
    const userId = req.user.id

    if (title) {
        conversationsConrtollers.createNewConversation({ title, imageUrl, userId })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: "Missing data", fields: {
                title: "string"
            }
        })
    }
}

const deleteConversation = (req, res) => {
    const id = req.params.conversation_id

    conversationsConrtollers.deleteConversation(id)
        .then(response => {
            if (response) {
                res.status(204).json({ message: `Conversation with id: ${id} has been deleted succesfully!` })
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id
    const { imageUrl, title } = req.body

    conversationsConrtollers.updateConversation(id, { imageUrl, title })
        .then(response => {
            if (response[0]) {
                res.status(200).json({ message: "Your conversation was edited succesfully!" })
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const putConversation = (req, res) => {
    const id = req.params.conversation_id
    const { imageUrl, title } = req.body

    if (imageUrl && title) {
        conversationsConrtollers.updateConversation(id, { imageUrl, title })
            .then(response => {
                if (response[0]) {
                    res.status(200).json({ message: "Your conversation was edited succesfully!" })
                } else {
                    res.status(404).json({ message: "Invalid ID" })
                }
            })
    } else {
        res.status(400).json({message: "Mising data", fields: {
            imageUrl: "string",
            title: "string"
        }})
    }
}

//! Exports
module.exports = {
    getAllConversationsByUserId,
    createNewConversation,
    getConversationById,
    deleteConversation,
    patchConversation,
    putConversation
} 