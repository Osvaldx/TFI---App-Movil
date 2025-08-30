import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { mailOutline, eyeOutline, eyeOffOutline, keyOutline, lockOpenOutline, closeCircleOutline, checkmarkCircleOutline, alertCircleOutline } from "ionicons/icons"

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

addIcons({
  'mail-outline': mailOutline,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
  'key': keyOutline,
  'lock-open-outline': lockOpenOutline,
  'close-circle-outline': closeCircleOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'alert-circle-outline': alertCircleOutline
})