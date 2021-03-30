import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './public/components/Hello';

const app = express();

const port = 3000;

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  const name = 'Pelu';

  const component = ReactDOMServer.renderToString(<Hello name={name} />);

  const html = `
  <!doctype html>
    <html>
    <head>
      <script>window.data = ${JSON.stringify({ name })}</script>
    </head>
    <body>
    <div id="root">${component}</div>
    <script src="/static/home.js"></script>
  </body>
  </html>`;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
