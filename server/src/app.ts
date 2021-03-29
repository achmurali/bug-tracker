import express from 'express';
import { PORT } from './utils/config';

const app = express();

app.get('/',(_,res) => {
    res.send("Hello World");
});

app.listen(PORT,() => {
    console.log("Listening on port 3000");
});

export default app;