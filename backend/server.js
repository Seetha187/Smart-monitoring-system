const express =require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");

console.log("CORRECT SERVER RUNNING");

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://seetha:****@cluster0.tbcaaoo.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log(err);
})

const DataSchema = new mongoose.Schema({
    Deviceid : String,
    temperature : Number,
    humidity: Number,
    timestamp: {type:Date,default:Date.now}
});

const Data = mongoose.model("Data",DataSchema);

app.get("/",(req,res)=>{
    res.send("Server is w");
});

app.post("/api/data",async (req,res)=>{
   
try{
    const newData = new Data(req.body);
    await newData.save();  
     io.emit("newData", newData);

    res.json({
        message:"Data is saved successfully"
    });
}
catch(err) {
    res.json({
        message:"error in data saving"
    });
}
});
app.get("/test", (req, res) => {
  res.send("Test working");
});

app.get("/api/data",async(req,res)=>{
   console.log("Hit");
   try{
    const data = await Data.find().sort({timestamp:-1}).limit(50);
    res.json(data);
   }
   catch(err){
    res.status(500).json({message: "Data is not fetched"});
   }
})
const server= http.createServer(app);
const io= new Server(server,{
    cors:{
      origin:  "*"
    }
});
server.listen(5000, () => {
  console.log("Server running with Socket.IO");
});