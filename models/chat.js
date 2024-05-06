const mongoose = require("mongoose");

//creating schema(structure)
const chatSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

//creating model (collection name- chats)
const Chat = mongoose.model("Chat", chatSchema);

//export model(Chat)
module.exports = Chat;
