import path from 'path';
import { config } from 'dotenv';
import http from 'http';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getLocalTimeFromService } from './libs/timeZoneMiddleWare';

config();

const { PORT = 8080 } = process.env;

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

app.get('/get-time-zone', async (req: Request, res: Response) => {
  const latitude = req.query.lat as string;
  const longitude = req.query.lng as string;
  const key = req.query.key as string;

  if (!latitude || !longitude || !key) {
    res.json({ message: 'latitude or longitude or privacy key missed!' });
  }

  const localTime = await getLocalTimeFromService({ latitude, longitude, key });
  res.json(localTime);
});

app.get('*', (req, res) => {
  res.json({
    message: 'I am an API, try http://localhost:8080/get-time-zone?lat=1&lng=1&key={YOUR_OWN_KEY}',
  });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.json({ message: 'Something broke!', error: err });
});

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT, () => {
  console.log(`listing on http://localhost:${PORT}`);
});
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
