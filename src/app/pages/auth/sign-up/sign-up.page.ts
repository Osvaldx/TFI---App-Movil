import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonButton, LoadingController, IonIcon, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { Notify } from 'src/app/services/notify';
import { ToastColors } from 'src/app/enums/list-colors-toast';

const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pass = group.get("password")?.value ?? "";
  const repeat = group.get("repeatPassword")?.value ?? "";

  if(!pass || !repeat) { return null }

  return pass === repeat ? null : { passwordMismatch: true }
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, LogoComponent, CustomInputComponent]
})

export class SignUpPage implements OnInit {

  authService = inject(Auth)
  router = inject(Router)
  toastController = inject(ToastController)
  notify = inject(Notify)

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required])
  }, { validators: passwordsMatchValidator })

  constructor(private loading: LoadingController) { }

  ngOnInit() {
  }

  async sendRegister(position: 'top' | 'bottom') {
    if(this.registerForm.controls.email.value === "" || this.registerForm.controls.password.value === "" || this.registerForm.controls.repeatPassword.value === "") {
      await this.notify.buildToast(ToastColors.red, "Complete todos los campos", 2000, "signup-header", "close-circle-outline");
      return
    }
    
    if(this.registerForm.hasError('passwordMismatch')) {
      await this.notify.buildToast(ToastColors.red, "Las contraseñas no son iguales", 2000, "signup-header", "close-circle-outline");
      return
    }
    
    await this.authService.signUp(this.registerForm.controls.email.value!, this.registerForm.controls.password.value!)
    .then(async(resp) => {
      if(resp.error?.code === "weak_password") {
        await this.notify.buildToast(ToastColors.red, "La contraseña es muy corta, minimo 6 caracteres", 2000, "signup-header", "close-circle-outline");
        return
      }
      
      if(resp.data.user?.identities?.length === 0) {
        await this.notify.buildToast(ToastColors.red, "Este email ya esta registrado", 2000, "signup-header", "close-circle-outline");
        return
      }
      
      if(resp.data.user?.role === "authenticated") {
        await this.notify.buildToast(ToastColors.green, "Registro exitoso", 2000, "signup-header", "checkmark-circle-outline");
        return
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  async sendPageLogin() {
    await this.notify.buildLoading("Volviendo al login...", 500);
    await this.router.navigateByUrl("auth", { replaceUrl: true });
  }
}
