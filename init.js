const mongoose = require("mongoose");
const Chat = require("./models/chat.js")
const { insertMany } = require("./models/chat");
main()
  .then(() =>{
     console.log("connection successful");
 })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChat = [
    {
        from:"roma",
        to :"jay",
        msg:"good morning",
        created_at: new Date()
    },
    {
        from:"lipa",
        to :"rohot",
        msg:"hello sir",
        created_at: new Date()
    },
    {
        from:"eve",
        to :"rupa",
        msg:"what is the result",
        created_at: new Date()
    },
    {
        from:"sura",
        to :"akash",
        msg:"what's up!",
        created_at: new Date()
    },
    {
        from:"roy",
        to :"rupali",
        msg:"may I help you",
        created_at: new Date()
    },
];

Chat.insertMany(allChat);
   
   

