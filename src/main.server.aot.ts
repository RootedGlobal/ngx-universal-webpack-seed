import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
// import { ngExpressEngine } from '@nguniversal/express-engine';
import { ngExpressEngine } from './express-engine';
import { AppServerModuleNgFactory } from '../compiled/src/app/app.server.module.ngfactory';
import { join } from 'path';

enableProdMode();

const PORT = process.env.PORT || 8081;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    aot: true
}));

app.set('port', PORT);
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

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
    console.log(`listening port ${PORT}...`);
});
