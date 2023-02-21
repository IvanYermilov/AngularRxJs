import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { interval, take } from 'rxjs';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);