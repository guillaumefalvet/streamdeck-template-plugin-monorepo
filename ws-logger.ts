import express, { Request, Response, NextFunction } from 'express';
import expressWs from 'express-ws';
import { ws } from 'express-ws';

const app = express();
const { app: appWithWebSocket } = expressWs(app);
appWithWebSocket.ws('/', (ws: ws, req: Request) => {
    console.log('Client connected');
    ws.on('message', (msg: string) => {
        console.log(msg);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    })
});

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
