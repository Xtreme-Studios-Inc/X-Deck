import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from '../src/main.server';
import { execCommand } from './cli-util';
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from './storage-util';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  });
  server.use(express.json());

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // MAIN ENTRY FOR MAIN FUNCTIONALITY
  server.get('/exec/*', (req, res) => {
    // Read all items from storage.json
    const pathSegments = req.path.split('/').slice(2);
    // console.log(pathSegments);
    if (pathSegments.length === 0) {
      return;
    }
    // console.log('test', pathSegments);
    // const item = getItems(pathSegments);
    const item = getItem(pathSegments[1]);
    // console.log(test);

    if (item.cmd) execCommand(item.cmd);

    res.json(item);
  });

  server.get('/assets/*', (req, res) => {
    res.sendFile(join(serverDistFolder, req.path));
  });

  server.get('/cms/items', (req, res) => {
    res.json(getItems([]));
  });

  server.get('/cms/item/*', (req, res) => {
    const pathSegments = req.path.split('/').slice(3);
    const item = getItem(pathSegments[0]);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(item);
  });

  server.put('/cms/item/*', (req, res) => {
    const item = updateItem(req.body);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(updateItem(req.body));
  });

  server.post('/cms/new', (req, res) => {
    const item = createItem(req.body);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(updateItem(req.body));
  });

  server.delete('/cms/item/*', (req, res) => {
    const pathSegments = req.path.split('/').slice(3);
    const item = deleteItem(getItem(pathSegments[0]));

    // const item = deleteItem(req.body);

    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(item);
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(Number(port), '0.0.0.0', () => {
    console.log(`Node Express server listening on http://0.0.0.0:${port}`);
  });
}

run();
