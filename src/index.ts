import express, { Express, Request, Response } from 'express';
import mongoose, { dbConfig } from 'mongoose';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({
	origin: "*",
	credentials : true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  
});
// const clientRouter  = require("./router/client_router");
// const authRouter    = require("./router/Auth_router");
// const userRouter    = require("./router/user_router");
// const adminRouter   = require("./router/Admin_router");
// const cors = require("cors");

app.use(cors({
	origin: "*",
	credentials : true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

// routes caller
// app.use("/api/client",clientRouter);
// app.use("/api/auth",authRouter);
// app.use("/api/user",userRouter);
// app.use("/api/admin",adminRouter);

mongoose.connect(dbConfig())
    .then(()=> {
        console.log("db started");
        app.listen(process.env.PORT || port, () =>{
            console.log("app started")
        })
    })
    .catch((e)=>{
        console.log(e);
        console.log("db failed to connect")
    })

