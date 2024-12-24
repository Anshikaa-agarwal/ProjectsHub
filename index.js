const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
//connection
mongoose
        .connect(" mongodb://127.0.0.1:27017/youtube-app-1")
        .then(()=>console.log("MongoDB Connected"))
        .catch((err)=>console.log("Mongo Error",err));   
//Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String, 
    }

})
const User = new mongoose.model("user",userSchema);
//MIDDLEWARE
app.use(express.urlencoded({extended : false}));
//Routes
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app
    .route("/api/users/:id")
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=> user.id===id);
        return res.json(user);
    })
    .put((req,res)=>{
        //EDIT USER WITH ID
        return res.json({status:"Pending"});
    })
    .patch((req,res)=>{
        //
        return res.json({return:"Pending"});
    })
    .delete((req,res)=>{
        return res.json({return:"Pending"});
    })
app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"successful",id:users.length});
    });
    //return res.json({status:"pending"})
});
// app.get("/users",(req,res)=>{
//     const html = `
//     <ul>
//         ${users.map(user => `<li>${user.first_name}</li>`).join('')}   
//     </ul>
//     `;
//     res.send(html);
// })

app.listen(8000,()=>console.log(`Server Started at PORT ${PORT}`));
