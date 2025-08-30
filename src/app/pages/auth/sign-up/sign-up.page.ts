import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, LoadingController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, LogoComponent, CustomInputComponent]
})
export class SignUpPage implements OnInit {

  router = inject(Router)

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required])
  })

  constructor(private loading: LoadingController) { }

  ngOnInit() {
  }

  sendRegister() {
    alert("xc")
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

  async sendPageLogin() {
    await this.showLoading("Volviendo al login...", 500);
    await this.router.navigateByUrl("auth", { replaceUrl: true });
  }

}
