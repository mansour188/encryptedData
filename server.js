const express=require("express")
const {userRouter}=require('./routers/UserRouter')
const reclamationRouter = require("./routers/Reclamation")
const cors = require('cors');


const app=express()
app.use(cors())
require("./connect")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(reclamationRouter)
const PORT=3000;
app.listen(PORT,()=>{
    console.log("lestning port "+PORT)
})