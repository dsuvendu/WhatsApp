const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverrid = require("method-override");

app.set ("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extends:true}));
app.use(methodOverrid("_method"))


main()
  .then(() =>{
     console.log("connection successful");
 })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}
let chat1 = new Chat ({
    from :"neha",
    to: "subu",
    msg :"sand me your exam paper",
    created_at :new Date()
});

Chat.findByIdAndDelete("65b1d2fcf685414f7a7c2b3f").then((res)=>{
    console.log(res);
})

chat1.save().then((res)=>{
    console.log(res);
}).catch(err =>{
    console.log(err);
});

app.get("/chats", async (req,res) =>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});
// new rout
app.get("/chats/new",(req,res) =>{
    res.render("new.ejs");
})
// creat rout
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
   newChat.save().then((res) =>{
    console.log("chat was saved");
   }).catch(err =>{
    console(err);
   });
    res.redirect("/chats");
});
// edit rout
app.get("/chats/:id/edit", async (req,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
// Update rout
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate
    (id,
        {msg:newMsg},
        {runValidators:true,new:true}
     );
 console.log(updatedChat);
 res.redirect("/chats");
})
// Delete rout
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})
app.get ("/",(req,res)=>{
    res.send("rout is working");
});

app.listen(8080,()=> {
    console.log("server is listening on 8080");
});
