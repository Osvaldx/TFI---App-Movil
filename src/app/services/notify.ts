import { inject, Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular'
import { ToastColors } from '../enums/list-colors-toast';

@Injectable({
  providedIn: 'root'
})

export class Notify {
  
  private toastController = inject(ToastController)
  private loading = inject(LoadingController)

  async buildToast(color: ToastColors, msg: string, ms: number, iconname: string) {
    const toast = await this.toastController.create({
      color: color,
      message: msg,
      duration: ms,
      position: 'top',
      positionAnchor: 'header',
      icon: iconname
    })

    await toast.present();
    await toast.onDidDismiss();
    return
  }

  async buildLoading(msg: string, ms: number) {
    const load = await this.loading.create({
      message: msg,
      duration: ms
    })

    await load.present();
    await load.onDidDismiss();
    return
  }
}
