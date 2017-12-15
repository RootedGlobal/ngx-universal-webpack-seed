import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import { enableProdMode } from '@angular/core';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import * as express from 'express';
// import { ngExpressEngine } from '@nguniversal/express-engine';
import { ngExpressEngine } from './express-engine';

import { AppServerModule } from './app/app.server.module';
import { join } from 'path';

enableProdMode();

const PORT = process.env.PORT || 8081;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
}));

app.set('port', PORT);
app.set('views', join(DIST_FOLDER, 'browser'));
app.set('view engine', 'html');

// serve static files
app.use(express.static(join(DIST_FOLDER, 'browser'))/*, { index: false}*/);

/**
 * use universal for our page routes
 */

app.get('/', (req, res) => {
    res.render('index', { req });
});

app.get('*', (req, res) => {
    res.render('index', { req, res });
});

app.listen(PORT, () => {
    console.log('listening port ' + PORT + '...');
});
