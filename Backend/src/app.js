const express = require("express");
const app=express();
const{ connectDb} = require("./config/database");
const authRouter = require("./routes/auth");



app.use(express.json());



app.use("/api/auth",authRouter);

const PORT = process.env.PORT || 5000;
connectDb()
.then(app.listen(PORT,()=>{
    console.log(`server is listing on ${PORT}`);
}))
.catch((err)=>{
        console.error("error in connecting DB")
}
)