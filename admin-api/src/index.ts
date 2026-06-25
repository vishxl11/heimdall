import express from 'express'
import adminRouter from './routes/routes.router.js';
import { connectRedis } from './common/redis-publisher.js';
import { authRouter } from './auth-users/auth.router.js';
import policiesRouter from './policies/policies.router.js'
import cbRouter from './circuitbreaker/cb.router.js' ;
import auditRouter from './audit-logs/audit.router.js'
import usersRouter from './admin-users/users.router.js'


const app=express() ;

app.use(express.json()) ;

app.use('/admin',adminRouter) ;

app.use('/admin/auth',authRouter) ;

app.use('/admin', policiesRouter) ;

app.use('/admin', cbRouter) ;

app.use('/admin', auditRouter) ;

app.use('/admin', usersRouter) ;

app.get("/health",(req,res)=>{

    res.status(200).json({
        status:"ok",
        service:"admin-api"
    })
})

async function init() {

  await connectRedis()
  app.listen(4000, () => console.log("admin-api running on port 4000"))

}

init() ;