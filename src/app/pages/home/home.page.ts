import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  authService = inject(Auth)
  router = inject(Router)

  constructor() { }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut()
    .then((resp) => {
      console.log(resp);
      if(resp.error === null) {
        this.router.navigateByUrl("/", { replaceUrl: true });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
