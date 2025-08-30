import { Component, Input, OnInit } from '@angular/core';
import { IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [IonImg]
})
export class LogoComponent  implements OnInit {

  @Input() image?: string
  @Input() alt?: string

  constructor() { }

  ngOnInit() {}

}
