import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, AlertController, LoadingController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CustomInputComponent } from "src/app/components/custom-input/custom-input.component";
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, HeaderComponent, CustomInputComponent, ReactiveFormsModule, LogoComponent]
})
export class AuthPage implements OnInit {

  authService = inject(Auth)
  router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private alertController: AlertController, private loading: LoadingController) { }

  ngOnInit() {
  }

  async buildAlert(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      backdropDismiss: false
    })

    await alert.present();
    await alert.onDidDismiss();
    return
  }

  onSubmit() {
    if(this.loginForm.controls.email.value === "" || this.loginForm.controls.password.value === "") {
      this.buildAlert("[!] Intento Invalido", "Complete todos los campos", "Necesita completar todos los campos para poder ingresar", ["Entendido","No entendi"]);
      return
    }

    this.authService.signIn(this.loginForm.controls.email.value!, this.loginForm.controls.password.value!)
    .then((resp) => {
      console.log(resp);
      if(resp.data.user?.role === "authenticated") {
        this.router.navigateByUrl("home");
      }

      if(resp.error) {
        this.buildAlert("[!] Credeciales invalidas", "Usuario no existente o datos incorrectos", "Porfavor, intente nuevamente para poder iniciar", ["Entendido","No entendi"])
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async showLoading(msj: string, duration: number) {
    const load = await this.loading.create({
      message: msj,
      duration: duration,
    })

    await load.present();
    await load.onDidDismiss();
    return
  }

  async sendPageSignUp() {
    await this.showLoading("Enviando al registro...", 500);
    await this.router.navigateByUrl("sign-up");
  }
}
