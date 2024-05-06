//Initialize database - In this file we have sample data so whenever our database will get empty we just run this file and it give us data

const Chat = require("./models/chat.js");
const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "neha",
        to: "preet",
        msg: "send me phone",
        created_at:new Date(),
    },
    {
        from: "keshav",
        to: "kartik",
        msg: "send me work",
        created_at:new Date(),
    },
    {
        from: "maman",
        to: "ishan",
        msg: "send me nudes",
        created_at:new Date(),
    },
]

Chat.insertMany(allChats);