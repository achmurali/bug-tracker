import express from 'express';
import cors from 'cors';

import authenticationRouter from './routers/authentication';
import errorHandler, {errorLogger} from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/',authenticationRouter);


app.get('/',(_,res) => {
    res.send("Hello World");
});

app.use(errorLogger);
app.use(errorHandler);

export default app;