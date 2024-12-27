import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { persistState } from '@datorama/akita';

const storage = persistState({
  key: 'food-app-akita', // Unique key for App 1
});
const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
