//! Dependencies
const router = require("express").Router()
const conversationsServices = require("./conversations.services")
const messageServices = require("../message/message.services")
const passport = require("passport")
require("../middlewares/auth.middleware")(passport)

router.route("/")
    .get(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.getAllConversationsByUserId
    )
    .post(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.createNewConversation
    )

router.route("/:conversation_id")
    .get(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.getConversationById
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.deleteConversation
    )
    .patch(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.patchConversation
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        conversationsServices.putConversation
    )

router.route("/:conversation_id/messages")
    .get(
        passport.authenticate("jwt", { session: false }),
        messageServices.getAllConversationMessages
    )
    .post(
        passport.authenticate("jwt", { session: false }),
        messageServices.createNewMessage
    )

router.route("/:conversation_id/messages/:message_id")
        .get(
            passport.authenticate("jwt", { session: false }),
            messageServices.getSpecificMessage
        )
        .delete(
            passport.authenticate("jwt", { session: false }),
            messageServices.deleteMessage
        )

module.exports = router