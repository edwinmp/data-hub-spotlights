/** eslint-disable no-console **/
import { config } from 'dotenv';
config();
import express from 'express';
import { parse } from 'url';
import next from 'next';

const PORT = 3000;
const HOST = process.env.HOST || 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const ROOT = process.env.SPOTLIGHTS_ROOT_PAGE || 'https://devinit.org/data/';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/', (_req, res) => res.redirect(ROOT)); // TODO: change this to the country spotlights page
    server.get('/bitly', (req, res) => {
      const longUrl = req.url.split('longUrl=')[1];
      if (longUrl) {
        if (process.env.BITLY_API_KEY) {
          return fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.BITLY_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ long_url: longUrl.replace('localhost', '127.0.0.1') }),
          })
            .then((response) => response.json())
            .then((data) => res.json({ code: 200, shortUrl: data.link }))
            .catch((error) => res.json({ code: 401, error: error.message }));
        } else {
          return res.json({ code: 401, error: 'BITLY_API_KEY is missing' });
        }
      }

      return res.json({ code: 400, error: 'Please provide a single URL' });
    });

    server.all('*', (req, res) => {
      const parsedUrl = parse(req.url as string, true);

      return handle(req, res, parsedUrl);
    });

    server.listen(PORT, (err) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          console.log('Address in use, retrying...');
          setTimeout(() => {
            server.listen(PORT, HOST);
          }, 1000);
        }
        console.log('ERROR: %s', err.message);
      } else {
        console.log('> Ready on http://localhost:3000');
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
