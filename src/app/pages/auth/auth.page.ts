import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CustomInputComponent } from "src/app/components/custom-input/custom-input.component";
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { Notify } from 'src/app/services/notify';
import { ToastColors } from 'src/app/enums/list-colors-toast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, FormsModule, HeaderComponent, CustomInputComponent, ReactiveFormsModule, LogoComponent]
})
export class AuthPage implements OnInit {

  authService = inject(Auth)
  router = inject(Router)
  notify = inject(Notify)

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  async signIn() {
    if(this.loginForm.controls.email.value === "" || this.loginForm.controls.password.value === "") {
      await this.notify.buildToast(ToastColors.red, "Complete todos los campos", 2000, "close-circle-outline")
      return
    }
    
    this.authService.signIn(this.loginForm.controls.email.value!, this.loginForm.controls.password.value!)
    .then(async (resp) => {
      console.log(resp);
      if(resp.data.user?.role === "authenticated") {
        await this.notify.buildToast(ToastColors.green, "Inicio de sesion exitoso", 1000, "checkmark-circle-outline")
        this.router.navigateByUrl("home", { replaceUrl: true });
      }
    })
    .catch(async (err) => {
      await this.notify.buildToast(ToastColors.red, "Credenciales invalidas", 2000, "close-circle-outline")
      console.log(err);
    })
  }

  async sendPageSignUp() {
    await this.notify.buildLoading("Enviando al registro...", 500);
    await this.router.navigateByUrl("sign-up", { replaceUrl: true });
  }
}
