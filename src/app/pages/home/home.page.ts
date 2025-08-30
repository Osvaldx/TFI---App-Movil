import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, HeaderComponent]
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
        this.router.navigateByUrl("/", { replaceUrl: true });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
