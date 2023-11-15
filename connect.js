const  mongoose=require("mongoose")
require("dotenv").config();
const {createUserIfNotExists}=require('./routers/UserRouter')




mongoose.connect(`mongodb+srv://new:Z4jzQNKyCNTLKRpd@cluster0.aot4fyq.mongodb.net/secuirty?retryWrites=true&w=majority`).then(()=>{
    console.log("mongoose connected ...")
    createUserIfNotExists()
}).catch((err)=>{
    console.log(err.message)
})


