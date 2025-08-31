import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonButton, IonAvatar, IonLabel, IonChip } from '@ionic/angular/standalone';
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonChip, IonLabel, IonAvatar, IonButton, IonMenu, IonContent, CommonModule, FormsModule, HeaderComponent, IonMenuButton]
})
export class HomePage implements OnInit {

  authService = inject(Auth)
  router = inject(Router)

  email$ = this.authService.user$.pipe(
    map(
      (usr) => usr?.email ?? "")
      ,distinctUntilChanged() // Para que si no cambio el mail no haga nada
    );

  constructor() { }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut()
    .then((resp) => {
      if(resp.error === null) {
        this.router.navigateByUrl("auth", { replaceUrl: true });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
