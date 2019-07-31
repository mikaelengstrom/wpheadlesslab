import express from 'express';
import path from 'path';
import log from 'llog';

import ssr from './lib/ssr';

const port = process.env.PORT || 1234;

const server = express();
const serveStatic = express.static;

server.use(
    '/dist/client',
    serveStatic(path.resolve(process.cwd(), '__dist', 'client'))
);

server.get('/*', ssr);

server.listen(port, () => {
    log.info(`Listening on port ${port} - have fun!`)
});