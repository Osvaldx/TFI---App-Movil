import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonIcon, IonItem, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  imports: [IonButton, CommonModule, ReactiveFormsModule,IonInput, IonIcon, IonItem]
})
export class CustomInputComponent  implements OnInit {
  
  @Input() controller!: FormControl
  @Input() type!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() autocomplete!:string
  @Input() icon!: string

  isPassword?: boolean
  hide?: boolean

  constructor() {}

  ngOnInit() {
    this.isPassword = (this.type == "password") ? true : false;
    this.hide = true;
  }

  showPassword() {
    if(this.hide) {
      this.type = "text";
      this.hide = !this.hide;
    } else {
      this.type = "password";
      this.hide = !this.hide
    }
  }

}
