const { User } = require("../../models")
const { AuthenticationError } = require('apollo-server-express')

function thisUser(parent, args, context) {
    if (context.user) return User.findOne({ _id: context.user._id }).populate("forms")
    throw new AuthenticationError("Not logged in")
}

function getForm(parent, args, context) {

}

module.exports = { thisUser, getForm }