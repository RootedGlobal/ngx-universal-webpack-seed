import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
