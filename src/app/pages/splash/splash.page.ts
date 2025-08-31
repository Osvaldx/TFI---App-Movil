import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  public animationType: 'in' | 'out' = 'in';

  router = inject(Router)

  constructor() {
    setTimeout(() => {
      this.animationType = 'out';
      setTimeout(() => { this.sendPageAuth() }, 600);
    }, 2000);
  }

  ngOnInit() {
  }

  sendPageAuth() {
    this.router.navigateByUrl("auth", { replaceUrl: true });
  }

}
