import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.configureStatusBar();
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false }); // Evita que se superponga
      StatusBar.setBackgroundColor({ color: '#687FE5' }); // Opcional, color de la barra
    });
  }

  async configureStatusBar() {
    if(Capacitor.getPlatform() != 'web') {
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color: '#ffffff'});
      await StatusBar.setStyle({ style: Style.Light });
    }
  }
}
