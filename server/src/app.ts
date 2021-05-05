import express from 'express';
import cors from 'cors';

import authenticationRouter from './routers/authentication';
import userRouter from './routers/user';
import projectsRouter from './routers/projects';
import bugRouter from './routers/bug'
import errorHandler, {errorLogger} from './middleware/errorHandler';
import unknownEndpointHandler from './middleware/unknownEndpointHandler';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/',authenticationRouter);
app.use('/',userRouter);
app.use('/',projectsRouter);
app.use('/',bugRouter);

app.get('/',(_,res) => {
    res.send("Hello World");
});

app.use(unknownEndpointHandler);

app.use(errorLogger);
app.use(errorHandler);

export default app;