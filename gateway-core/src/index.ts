import express from 'express'

const app=express() ;



app.get("/health",(req,res)=>{

    res.status(200).json({
        status:"ok",
        service:"gateway-core"
    })
})

app.listen(3000,()=>{
    console.log("gateway-core is running on port 3000") ;
})