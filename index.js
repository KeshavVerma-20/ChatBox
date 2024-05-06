const express = require("express");
const app = express();
const port = 8080;
app.listen(port, () => {
  console.log("server live on port no 8080");
});
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const path = require("path");
//importing Chat model
const Chat = require("./models/chat.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//public folder ka acess dene k lie ie css wali file k lie
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(
    "mongodb+srv://vkeshav776:bxVa2dApcKs78600@cluster0.j4bbjc5.mongodb.net/chatbox"
  );
}

app.get("/", (req, res) => {
  res.send("Root is working for all chats go on /chats");
});

//YE SARA KAM HUMNE init.js WALI FILE MAI KR DIA HAI

//creating document
// const chat1 = new Chat({
//   //jo schema bnaya hai vo wale attributes hi mongodb mai ja kar save honge unke bina koi bhi attribute nahi save hoga
//   from: "neha",
//   to: "priya",
//   msg: "send me pic",
//   created_at: new Date(), //Date is class in js use to create dates (random date and time create ho jaye ga)
// });
// chat1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(res);
//   });

//Index route of All chats
app.get("/chats", async (req, res) => {
  //chat.find() se Chat model ka sara data aa jayega usse hum chats variable mai store kr dege
  //.find() ek async function hai so hum ise await karwayegay and async (req,res)
  let chats = await Chat.find();
  // console.log(chats);
  // res.send("Working");
  res.render("index.ejs", { chats });
});

//Route for adding new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create route (post) it will add new chat in db
//ye chat permanently db mai add ho jayegi
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date(),
  });
  // console.log(newChat);
  newChat
    .save() //.save() is a async fun but no need to write await and async coz already then lga hua hai
    .then((res) => {
      console.log("new chat is get saved in db");
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("post req is working");
  res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id); // findById() is asyanc fun and hum then use nahi kr rahe so await and asyanc ayega
  res.render("edit.ejs", { chat });
});

//update Route in db by put request
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//Delete route permanently delete chat in db
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});
