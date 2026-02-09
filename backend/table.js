

const mongoose=require("mongoose")

const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Error",err))

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String

})
const Data = mongoose.model("Data", userSchema, "courses")


app.get("/", async (req, res) => {
    const stu = await Data.find()
    res.send(stu)
    console.log(stu)

})

app.post("/add", async(req,res)=>{
    const {name,age,course}=req.body

    const   NewUser= new Data({
        name,
        age,
        course

    })
     await NewUser.save();

  res.json(NewUser);        
})


app.get("/update/:id",(req,res)=>{
    const id=req.params.id
    
    Data.findById(id)
    .then((data)=>{
        if(!data)
            return res.status(400).json({error:"User not found"})
        res.json(data)
    })
    .catch((err)=>{
        console.log("error" ,err)
          res.status(500).json({ error: "Server error" })
    })

})

app.put("/update/:id" ,(req,res)=>{
    const id=req.params.id
     const {name,age,course}=req.body
    Data.findByIdAndUpdate(id,{name,age,course},{new:true})
    .then((upuser)=>{
        if(!upuser)
            return res.status(400).json({error:"user not find"})
        res.json(upuser)
    })
    .catch((err)=>{
        console.log("error",err)
    })

})

app.delete("/:id", (req,res)=>{
    const id=req.params.id
    Data.findByIdAndDelete(id)
    .then(()=>res.json({Message:"user deleted successfuly"}))
    .catch((err)=>res.status(500).json({error:"fallid to delete user "}))
})




app.listen(4000, () => {
    console.log("server running on port 4000")
})