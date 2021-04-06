import express from 'express';
import cors from 'cors';

import authenticationRouter from './routers/authentication';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/',authenticationRouter);


app.get('/',(_,res) => {
    res.send("Hello World");
});

export default app;