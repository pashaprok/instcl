import http from 'http';
import express, { Application } from 'express';

const expressApp: Application = express();
const app = http.createServer(expressApp);

export default {
  http: app,
  express: expressApp
}
