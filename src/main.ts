import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}
//"preserveWhitespaces: true" preserva os espaços em branco nos templates
platformBrowserDynamic().bootstrapModule(AppModule/*, { preserveWhitespaces: true } */);
